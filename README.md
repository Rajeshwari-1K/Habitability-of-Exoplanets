Habitability of Exoplanets Prediction Dashboard
1. Project Description

This project predicts the habitability of exoplanets using machine learning.
It uses XGBoost as the main model and provides an interactive dashboard for predictions.

Features:

User-friendly input forms for model features (mass, radius, temperature, etc.)

Real-time predictions with probability scores

Visual representation of results using charts/graphs

Handles missing values and preprocessing automatically

2. Setup Instructions
Step 1: Clone the repository
git clone <your-repo-link>
cd Habitability-of-Exoplanets

Step 2: Create a virtual environment (recommended)
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

Step 3: Install required libraries
pip install -r requirements.txt


requirements.txt example:

xgboost==1.7.6
scikit-learn==1.3.2
pandas==2.1.1
numpy==1.25.0
flask==3.0.6   # if using Flask for dashboard
matplotlib==3.8.1   # optional for plots
seaborn==0.12.2      # optional for plots

Step 4: Run the application
python app.py


Open your browser at:

http://127.0.0.1:5000

3. Demo Screenshots

Add screenshots of your dashboard and predictions here

4. Model & Preprocessing Explanation

Model Used: XGBoost Classifier

Reason for Choosing: Handles tabular data well, fast training, good accuracy

Data Preprocessing:

Missing values handled (mean/median/mode)

Categorical variables encoded

Features scaled using StandardScaler

Prediction Workflow:

User inputs data in dashboard

Data is preprocessed

Preprocessed data is fed into the model

Prediction displayed with probability

5. Future Improvements

Hyperparameter tuning for better accuracy

Add interactive charts for results analysis

Deploy online for easy access (Heroku, Render, PythonAnywhere)

✅ Next Step: Make sure your app.py reads the saved model (model.json) and scaler (scaler_v1.joblib) from the folder so it works when you demo.