from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
from ultralytics import YOLO
import cv2
import numpy as np
from datetime import datetime
from pathlib import Path
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'static'
Path(UPLOAD_FOLDER).mkdir(exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
YOLO_MODEL_PATH = 'best.pt'

# Perspective transform constants
WARP_SRC = np.float32([[580, 460], [700, 460], [200, 680], [1000, 680]])
WARP_DST = np.float32([[300, 0], [900, 0], [300, 720], [900, 720]])

def run_pothole_detection(input_path, output_path):
    try:
        logger.info(f"Starting pothole detection on {input_path} using YOLO model: {YOLO_MODEL_PATH}")
        
        # Load YOLO model
        model = YOLO(YOLO_MODEL_PATH)
        class_names = model.names
        logger.info(f"YOLO model loaded successfully. Classes: {class_names}")
        
        # Open video file
        cap = cv2.VideoCapture(input_path)
        if not cap.isOpened():
            logger.error(f"Could not open video file: {input_path}")
            return False
            
        # Get video properties
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        
        if fps <= 0:
            fps = 30  # Default to 30 fps if unable to determine
            
        # Use fixed output dimensions for consistency
        output_width, output_height = 1020, 500
        
        # Use H.264 codec for better web compatibility
        fourcc = cv2.VideoWriter_fourcc(*'avc1')
        out = cv2.VideoWriter(output_path, fourcc, fps, (output_width, output_height))
        
        if not out.isOpened():
            logger.error(f"Could not create output video writer: {output_path}")
            return False
            
        frame_count = 0
        processed_count = 0
        
        while True:
            ret, img = cap.read()
            if not ret:
                break
                
            frame_count += 1
            
            # Process every 3rd frame to speed up processing
            if frame_count % 3 != 0:
                continue
                
            processed_count += 1
            
            # Resize frame to output dimensions
            img = cv2.resize(img, (output_width, output_height))
            
            # Run YOLO detection
            results = model.predict(img)
            
            # Process detection results
            for r in results:
                boxes = r.boxes
                masks = getattr(r, 'masks', None)
                
                # If masks are available (segmentation model)
                if masks is not None:
                    masks = masks.data.cpu().numpy()
                    for seg, box in zip(masks, boxes):
                        seg = cv2.resize(seg, (output_width, output_height))
                        contours, _ = cv2.findContours(seg.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                        for contour in contours:
                            cls = int(box.cls)
                            label = class_names[cls]
                            conf = float(box.conf)
                            x, y, _, _ = cv2.boundingRect(contour)
                            
                            # Draw contour and label with confidence
                            cv2.polylines(img, [contour], True, (0, 0, 255), 2)
                            cv2.putText(img, f"{label} {conf:.2f}", (x, y - 10), 
                                      cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
                
                # If only bounding boxes are available
                else:
                    for box in boxes:
                        x1, y1, x2, y2 = map(int, box.xyxy[0])
                        cls = int(box.cls)
                        conf = float(box.conf)
                        label = class_names[cls]
                        
                        # Draw bounding box and label with confidence
                        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 0, 255), 2)
                        cv2.putText(img, f"{label} {conf:.2f}", (x1, y1 - 10), 
                                  cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
            
            # Add processing indicator
            cv2.putText(img, "Pothole Detection Active", (20, 30), 
                      cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            
            # Write the frame
            out.write(img)
            
            # Log progress occasionally
            if processed_count % 10 == 0:
                logger.info(f"Processed {processed_count} frames")
        
        cap.release()
        out.release()
        
        logger.info(f"Pothole detection complete: {processed_count} frames processed")
        return os.path.exists(output_path) and os.path.getsize(output_path) > 0
        
    except Exception as e:
        logger.exception(f"Error in pothole detection: {str(e)}")
        return False

class LaneDetector:
    def __init__(self):
        self.left_fit = None
        self.right_fit = None
        self.ploty = None
        self.margin = 100
        self.min_pixels = 50
        
    def perspective_transform(self, img):
        M = cv2.getPerspectiveTransform(WARP_SRC, WARP_DST)
        warped = cv2.warpPerspective(img, M, (img.shape[1], img.shape[0]))
        return warped

    def inverse_perspective(self, img):
        M = cv2.getPerspectiveTransform(WARP_DST, WARP_SRC)
        return cv2.warpPerspective(img, M, (img.shape[1], img.shape[0]))

    def process_frame(self, frame):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (5, 5), 0)
        edges = cv2.Canny(blur, 50, 150)
        return self.perspective_transform(edges)

    def find_lane_pixels(self, binary_warped):
        histogram = np.sum(binary_warped[binary_warped.shape[0]//2:,:], axis=0)
        midpoint = histogram.shape[0]//2
        leftx_base = np.argmax(histogram[:midpoint])
        rightx_base = np.argmax(histogram[midpoint:]) + midpoint

        nwindows = 9
        window_height = binary_warped.shape[0]//nwindows
        
        nonzero = binary_warped.nonzero()
        nonzeroy = np.array(nonzero[0])
        nonzerox = np.array(nonzero[1])
        
        leftx_current = leftx_base
        rightx_current = rightx_base
        
        left_lane_inds = []
        right_lane_inds = []

        for window in range(nwindows):
            win_y_low = binary_warped.shape[0] - (window+1)*window_height
            win_y_high = binary_warped.shape[0] - window*window_height
            
            win_xleft_low = leftx_current - self.margin
            win_xleft_high = leftx_current + self.margin
            win_xright_low = rightx_current - self.margin
            win_xright_high = rightx_current + self.margin
            
            good_left_inds = ((nonzeroy >= win_y_low) & 
                              (nonzeroy < win_y_high) & 
                              (nonzerox >= win_xleft_low) & 
                              (nonzerox < win_xleft_high)).nonzero()[0]
            good_right_inds = ((nonzeroy >= win_y_low) & 
                               (nonzeroy < win_y_high) & 
                               (nonzerox >= win_xright_low) & 
                               (nonzerox < win_xright_high)).nonzero()[0]
            
            left_lane_inds.append(good_left_inds)
            right_lane_inds.append(good_right_inds)
            
            if len(good_left_inds) > self.min_pixels:
                leftx_current = int(np.mean(nonzerox[good_left_inds]))
            if len(good_right_inds) > self.min_pixels:
                rightx_current = int(np.mean(nonzerox[good_right_inds]))

        try:
            left_lane_inds = np.concatenate(left_lane_inds)
            right_lane_inds = np.concatenate(right_lane_inds)
        except ValueError:
            return None, None, None, None

        leftx = nonzerox[left_lane_inds]
        lefty = nonzeroy[left_lane_inds] 
        rightx = nonzerox[right_lane_inds]
        righty = nonzeroy[right_lane_inds]

        return leftx, lefty, rightx, righty

    def fit_polynomial(self, leftx, lefty, rightx, righty):
        if len(leftx) == 0 or len(lefty) == 0 or len(rightx) == 0 or len(righty) == 0:
            return None, None

        self.left_fit = np.polyfit(lefty, leftx, 2)
        self.right_fit = np.polyfit(righty, rightx, 2)
        
        self.ploty = np.linspace(0, 720-1, 720)
        left_fitx = self.left_fit[0]*self.ploty**2 + self.left_fit[1]*self.ploty + self.left_fit[2]
        right_fitx = self.right_fit[0]*self.ploty**2 + self.right_fit[1]*self.ploty + self.right_fit[2]
        
        return left_fitx, right_fitx

    def measure_curvature(self):
        ym_per_pix = 30/720 
        xm_per_pix = 3.7/700 
        
        y_eval = np.max(self.ploty)
        
        left_fit_cr = np.polyfit(self.ploty*ym_per_pix, self.left_fit[0]*self.ploty**2 + self.left_fit[1]*self.ploty + self.left_fit[2], 2)
        right_fit_cr = np.polyfit(self.ploty*ym_per_pix, self.right_fit[0]*self.ploty**2 + self.right_fit[1]*self.ploty + self.right_fit[2], 2)
        
        left_curverad = ((1 + (2*left_fit_cr[0]*y_eval*ym_per_pix + left_fit_cr[1])**2)**1.5) / np.absolute(2*left_fit_cr[0])
        right_curverad = ((1 + (2*right_fit_cr[0]*y_eval*ym_per_pix + right_fit_cr[1])**2)**1.5) / np.absolute(2*right_fit_cr[0])
        
        return (left_curverad + right_curverad)/2

    def draw_lane(self, frame, warped, left_fitx, right_fitx):
        warp_zero = np.zeros_like(warped).astype(np.uint8)
        color_warp = np.dstack((warp_zero, warp_zero, warp_zero))
        
        pts_left = np.array([np.transpose(np.vstack([left_fitx, self.ploty]))])
        pts_right = np.array([np.flipud(np.transpose(np.vstack([right_fitx, self.ploty])))])
        pts = np.hstack((pts_left, pts_right))
        
        cv2.fillPoly(color_warp, np.int_([pts]), (0,255, 0))
        newwarp = self.inverse_perspective(color_warp)
        result = cv2.addWeighted(frame, 1, newwarp, 0.3, 0)
        
        curvature = self.measure_curvature()
        cv2.putText(result, f"Radius of Curvature: {int(curvature)}m", (20, 50), 
                   cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
        
        return result

@app.route('/process', methods=['POST'])
def process_video():
    try:
        if 'video' not in request.files:
            logger.error("No video file in request")
            return jsonify({'error': 'No video file in request'}), 400
            
        video = request.files['video']
        detection_type = request.form.get('detection')
        
        if not video or video.filename == '':
            logger.error("Empty video file")
            return jsonify({'error': 'Empty video file'}), 400
            
        if not detection_type:
            logger.error("No detection type provided")
            return jsonify({'error': 'No detection type provided'}), 400

        logger.info(f"Received video: {video.filename}, Detection: {detection_type}")

        # Check if YOLO model exists for pothole detection
        if detection_type == 'pothole' and not os.path.exists(YOLO_MODEL_PATH):
            logger.error(f"YOLO model file not found: {YOLO_MODEL_PATH}")
            return jsonify({'error': f'YOLO model file not found: {YOLO_MODEL_PATH}'}), 500

        # Save uploaded video with a timestamp to avoid overwriting
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = secure_filename(video.filename)
        input_path = os.path.join(app.config['UPLOAD_FOLDER'], f"input_{timestamp}_{filename}")
        output_filename = f"processed_{timestamp}_{filename}"
        output_path = os.path.join(app.config['UPLOAD_FOLDER'], output_filename)
        
        logger.info(f"Saving input video to: {input_path}")
        video.save(input_path)

        # Process the video based on detection type
        if detection_type == 'pothole':
            success = run_pothole_detection(input_path, output_path)
        elif detection_type == 'lane':
            success = run_lane_detection(input_path, output_path)
        else:
            logger.error(f"Invalid detection type: {detection_type}")
            return jsonify({'error': 'Invalid detection type'}), 400

        if not success:
            return jsonify({'error': 'Video processing failed'}), 500

        # Check if output file exists and has size > 0
        if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
            logger.error(f"Output video file missing or empty: {output_path}")
            return jsonify({'error': 'Generated video is missing or empty'}), 500

        video_url = f"/static/{output_filename}"
        logger.info(f"Video processing complete. Output at: {video_url}")
        
        return jsonify({
            'message': 'Video processed successfully',
            'video_url': video_url,
            'timestamp': timestamp
        }), 200

    except Exception as e:
        logger.exception(f"Exception in process_video: {str(e)}")
        return jsonify({'error': str(e)}), 500# ... (same as original process_video endpoint) ...

def run_lane_detection(input_path, output_path):
    try:
        logger.info(f"Starting improved lane detection on {input_path}")
        detector = LaneDetector()
        cap = cv2.VideoCapture(input_path)
        
        if not cap.isOpened():
            logger.error(f"Could not open video file: {input_path}")
            return False
            
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        
        fourcc = cv2.VideoWriter_fourcc(*'avc1')
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
        
        frame_count = 0
        while True:
            ret, frame = cap.read()
            if not ret:
                break
                
            processed = detector.process_frame(frame)
            leftx, lefty, rightx, righty = detector.find_lane_pixels(processed)
            
            if leftx is not None:
                left_fitx, right_fitx = detector.fit_polynomial(leftx, lefty, rightx, righty)
                if left_fitx is not None:
                    frame = detector.draw_lane(frame, processed, left_fitx, right_fitx)
            
            cv2.putText(frame, "Lane Detection Active", (20, 30), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            out.write(frame)
            frame_count += 1
        
        cap.release()
        out.release()
        logger.info(f"Processed {frame_count} frames")
        return True
        
    except Exception as e:
        logger.exception(f"Error in lane detection: {str(e)}")
        return False

# Route to serve static files
@app.route('/static/<path:filename>')
def serve_static(filename):
    logger.info(f"Serving static file: {filename}")
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Health check endpoint
@app.route('/', methods=['GET'])
def index():
    # Check if YOLO model is available
    yolo_status = "Available" if os.path.exists(YOLO_MODEL_PATH) else "Missing"
    
    return jsonify({
        'status': 'Server is running',
        'yolo_model': yolo_status,
        'version': '1.0',
        'endpoints': {
            '/process': 'POST - Process video',
            '/static/<filename>': 'GET - Serve processed videos'
        }
    }), 200

if __name__ == '__main__':
    logger.info("Starting Flask server on port 8000...")
    # Check for YOLO model
    if not os.path.exists(YOLO_MODEL_PATH):
        logger.warning(f"YOLO model file not found: {YOLO_MODEL_PATH}")
        logger.warning("Pothole detection will not work until model file is available")
    app.run(debug=True, port=8000)


# ... (rest of original app.py code remains unchanged) ...
