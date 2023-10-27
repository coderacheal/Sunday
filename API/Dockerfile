# Use an official Python runtime as a parent image
FROM python:3.10-alpine3.18

#Install dependencies from requirements.txt
COPY requirements.txt /tmp/requirements.txt
RUN python -m pip install -r /tmp/requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app

# Set the working directory to the app directoiry
WORKDIR /app

# Make port 80 available outside this container
EXPOSE 80

# Run app.py when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]