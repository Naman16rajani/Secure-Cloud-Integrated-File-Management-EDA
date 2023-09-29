import boto3
import io
import zipfile
import base64
import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def download_from_s3(event, bucket_name, folder_name, file_name):
    try:
        if event and bucket_name:
            s3 = boto3.client("s3")
            file_obj = s3.get_object(Bucket=bucket_name, Key=f"{folder_name}/{file_name}")
            file_content = file_obj["Body"].read()

            response = {
                "statusCode": 200,
                "headers": {
                    "Content-Type": "application/zip",
                    "Content-Disposition": f"attachment; filename={file_name}",
                },
                "body": base64.b64encode(file_content).decode("utf-8"),
                "isBase64Encoded": True,
            }

            # Delete the zip file from S3
            s3.delete_object(Bucket=bucket_name, Key=f"{folder_name}/{file_name}")

            return response
        else:
            return {
                "statusCode": 500,
                "body": json.dumps({'message': 'Error: bucket name or folder name is not provided'}),
            }
    except Exception as e:
        logger.error(e)
        return {"statusCode": 500, "body": json.dumps({'message': 'Error'})}

def zipping(event):
    s3 = boto3.client('s3')
    bucket_name = 'my-file-upload-bucket-storage'
    folder_key = 'data'
    zip_file_name = 'archive.zip'
    zip_file_path = f"{folder_key}/{zip_file_name}"

    try:
        # Create an in-memory buffer to store the zipped data
        in_memory_zip = io.BytesIO()

        # Create a new ZipFile instance
        with zipfile.ZipFile(in_memory_zip, 'w', zipfile.ZIP_DEFLATED) as zf:
            # List all objects in the folder
            response = s3.list_objects_v2(Bucket=bucket_name, Prefix=folder_key)
            for obj in response.get('Contents', []):
                file_name = obj.get('Key', '')

                # Skip the folder key itself
                if file_name == folder_key + '/':
                    continue

                # Download the object data from S3
                response = s3.get_object(Bucket=bucket_name, Key=file_name)
                data = response['Body'].read()

                # Add the object data to the zip file
                zf.writestr(file_name, data)

        # Seek to the beginning of the buffer
        in_memory_zip.seek(0)

        # Upload the zipped data to S3
        s3.put_object(Body=in_memory_zip.getvalue(), Bucket=bucket_name, Key=zip_file_path)

        return download_from_s3(event, bucket_name, folder_key, zip_file_name)
    except Exception as e:
        logger.error(e)
        return {"statusCode": 500, "body": json.dumps({'message': 'Error during zipping and uploading'})}

def lambda_handler(event, context):
    return zipping(event)
