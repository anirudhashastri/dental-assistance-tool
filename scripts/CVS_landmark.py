import cv2
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import tkinter as tk
from tkinter import filedialog
from tensorflow.keras import backend as K
from keras.models import load_model


# Function to preprocess the image
def preprocess_image(image):
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced_image = clahe.apply(image)
    filtered_image = cv2.bilateralFilter(enhanced_image, d=9, sigmaColor=75, sigmaSpace=75)
    return enhanced_image, filtered_image

# Function to compute Dice coefficient
epsilon = 1e-7
def dice_coeff(y_true, y_pred):
    y_true_f = K.flatten(y_true)
    y_pred_f = K.flatten(y_pred)
    intersection = K.sum(y_true_f * y_pred_f)
    dice = (2. * intersection + epsilon) / (K.sum(y_true_f) + K.sum(y_pred_f) + epsilon)
    return dice

# Function to compute Dice loss
def dice_loss(y_true, y_pred):
    dice = dice_coeff(y_true, y_pred)
    return 1 - dice

# Load the model with custom objects
unet = load_model('D:/RaiDental/ToolApp/scripts/Midterm_Model_1000_enhanced_images.h5', custom_objects={'dice_coeff': dice_coeff, 'dice_loss': dice_loss})

# Function to select an image
def select_image():
    root = tk.Tk()
    root.withdraw()
    file_path = filedialog.askopenfilename()
    return file_path

# Function to save the result
def save_image(image):
    root = tk.Tk()
    root.withdraw()
    save_path = filedialog.asksaveasfilename(defaultextension=".png", filetypes=[("PNG files", "*.png"), ("All files", "*.*")])
    cv2.imwrite(save_path, image)
    print(f"Image saved to {save_path}")


# Function to run the prediction pipeline
def run_pipeline():
    test_image=[]
    image_path = select_image()
    if not image_path:
        print("No image selected.")
        return
    
    image = cv2.imread(image_path, 0)
    if image is None:
        print("Error reading image.")
        return
    
    new_image = cv2.resize(image, (256, 256))
    new_image = new_image.reshape((new_image.shape[0], new_image.shape[1], 1))
    enhanced_image, filtered_image = preprocess_image(new_image)
    
    test_image.append(enhanced_image / 255)
    test_image_stacked = np.stack(test_image, axis=0)
    
    pred_mask = unet.predict(test_image_stacked)

    #cv2.imshow("img",pred_mask[0])
    #cv2.waitKey(0)
    #cv2.destroyAllWindows()
    
    # convert to RGB
    test_im_gray = test_image_stacked[0]  
    test_im_gray_convert = test_im_gray[:,:].astype(np.float32)
    test_im_rgb = cv2.cvtColor(test_im_gray_convert, cv2.COLOR_GRAY2RGB)
    
    #overlay mask onto original image
    overlayed_image = test_im_rgb.copy()
    overlayed_image[:,:,0] = overlayed_image[:,:,0] + pred_mask[0][:,:,0]

    #cv2.imshow("overlay",overlayed_image)
    #cv2.waitKey(0)
    #cv2.destroyAllWindows()
    
    overlayed_image = cv2.cvtColor(overlayed_image, cv2.COLOR_BGR2RGB)
    save_image(overlayed_image)




# Initialize the pipeline
def init():
    run_pipeline()

# Start the pipeline
if __name__ == "__main__":
    init()