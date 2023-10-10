# Use an official Python runtime as a parent image
FROM python:3.10-alpine3.18

# Set the working directory in the container
WORKDIR /app

#install dependencies in requirements.txt
COPY requirements.txt /app
RUN pip install --timeout 2000 -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Copy the current directory contents into the container at /app
COPY . /app

# Run app.py when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]