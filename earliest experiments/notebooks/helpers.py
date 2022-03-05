import matplotlib.pyplot as plt
import tensorflow as tf
import pandas as pd
import numpy as np
import datetime
import os

def create_window_labels(x, horizon):
    """
    Creates labels for windowed dataset
    
    Eg. if horizon=1
    Input: [0,1,2,3,4,5,6,7] -> Output: ([0,1,2,3,4,5,6],[7])
    """
    return x[:, :-horizon], x[:,-horizon:]

def make_windows(x, window_size, horizon):
    """
    Creates a window out of 
    """
    # Create a window of specific window size 
    window_step = np.expand_dims(np.arange(window_size+horizon), axis=0)
    
    # Create a 2D array of multiple window steps
    window_indices = window_step + np.expand_dims(np.arange(len(x)-(window_size+horizon-1)), axis=0).T
    
    # Index on the target array (a time series) with 2D array of multiple window steps
    windowed_array = x[window_indices]

    windows, labels = create_window_labels(windowed_array, horizon)
    
    return windows, labels

def train_test_split(windows, labels, size=.2):
    """
    Splits windows and labels into train and test splits.
    """
    
    split_size = int(len(windows) * (1-size))
    
    window_train = windows[:split_size]
    window_test = windows[split_size:]
    
    label_train = windows[:split_size]
    label_test = windows[split_size:]
    
    return window_train, window_test, label_train, label_test


time_stamp = datetime.datetime.now().strftime('%Y_%m_%d_%H%M%S')

def learning_rate_scheduler():
    """
    A learning rate callback
    """
    
    lr = tf.keras.callbacks.LearningRateScheduler(lambda epochs: 3e-1*10 ** (epochs/20))
    return lr
  
def model_checkpoint_callback(experiment_name:str):
    """Creates a ModelCheckpoint callback 

    Args:
        experiment_name (str): Name of current experiment (e.g 'base_model')

    Returns:
        _type_: _description_
    """
    checkpoint_path = os.path.join('Callbacks','checkpoints',time_stamp+'_'+experiment_name.replace(' ','_').lower())
    checkpoint_callback = tf.keras.callbacks.ModelCheckpoint(filepath=checkpoint_path,
                                                           verbose=1,
                                                           save_best_weights_only=True)
    return checkpoint_callback

def evaluate_model(checkpoint_path, x_test, y_test):
    """
    Loads presaved model checkpoint callbacks returns a model evaluation score.
    
    Parameters:
    -----------
    checkpoint_path : The path to your saved modelcheckpoint callbacks e.g. `Callbacks/checkpoints/...`
    x_test: Array of feature Variables
    y_test: Array of labels
    """
    
    model = tf.keras.models.load_model(checkpoint_path)
    return model.evaluate(x_test, y_test)

def predict(model, X):
    """
    Makes predictions on X using model
    """
    predictions = model.predict(X)
    return tf.squeeze(predictions)

def plot_series(timesteps, values, format=".", start=0, end=None, label=None):
    """
    Plots timesteps against values
    
    Parameters
    ----------
    timesteps : array of timestep values
    values : array of values across time
    format : style of plot, default "."
    start : where to start the plot (indices from timesteps)
    end : wher to end the plot
    label : label to show on plot values, default None
    """
    
    # plot series
    plt.figure(figsize=(10,7))
    plt.plot(timesteps[start:end], values[start:end], format, label=label)
    plt.xlabel('Time')
    
    if label:
        plt.legend(fontsize=14)
    plt.grid(True)