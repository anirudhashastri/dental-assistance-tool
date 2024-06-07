from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/run_tool', methods=['POST'])
def run_tool():
    # Simulate running a tool and saving an image
    #image_path = 'D:/RaiDental/ToolApp/public/images/header.png'
    
    """# Simulate saving an image (in practice, your tool would generate this)
    with open(image_path, 'wb') as f:
        f.write(b'')  # Replace with actual image data"""
    
    #return jsonify({"success": True, "image_path": image_path})
    # Return the web-accessible path (relative to the static directory)
    return jsonify({"success": True, "image_path": '/images/header.png'})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
