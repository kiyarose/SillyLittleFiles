
<?php

// Error/message handling
$errors = [];
$message = '';

if (isset($_FILES['json_file'])) {
  $file = $_FILES['json_file'];
  $fileName = $file['name'];
  $fileTmpName = $file['tmp_name'];
  $fileSize = $file['size'];
  $fileError = $file['error'];

  // Check if a file was uploaded
  if ($fileError === UPLOAD_ERR_NO_FILE) {
    $errors[] = "Please select a file to upload.";
  }

  // Validate file size
  $maxSize = 1048576; // 1MB
  if ($fileSize > $maxSize) {
    $errors[] = "File size exceeds limit (1MB).";
  }

  // Validate file type (optional, consider using mimes)
  if ($file['type'] !== 'application/json') {
    $errors[] = "Invalid file format. Please upload a JSON file.";
  }

  // Process and edit file if no errors
  if (empty($errors)) {
    $fileContent = file_get_contents($fileTmpName);
    $jsonData = json_decode($fileContent, true); // Decode to associative array

    // Perform editing here (replace with your editing logic)
    if (isset($_POST['edit_content'])) {
      $jsonData['edited_key'] = $_POST['edit_value']; // Example edit
      $editedData = json_encode($jsonData, JSON_PRETTY_PRINT); // Encode with formatting
    }

    $message = 'File uploaded successfully.';
  }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JSON File Editor</title>
</head>
<body>
  <h1>JSON File Editor</h1>
  <?php if (!empty($errors)): ?>
    <ul style="color: red;">
      <?php foreach ($errors as $error): ?>
        <li><?php echo $error; ?></li>
      <?php endforeach; ?>
    </ul>
  <?php elseif (!empty($message)): ?>
    <p style="color: green;"><?php echo $message; ?></p>
  <?php endif; ?>
  <form method="post" enctype="multipart/form-data">
    <input type="file" name="json_file" accept=".json">
    <button type="submit">Upload</button>
  </form>
  <?php if (isset($jsonData)): ?>
    <h2>Edit JSON Data</h2>
    <pre><?php echo $fileContent; ?></pre>
    <form method="post">
      <label for="edit_key">Edit Key:</label>
      <input type="text" name="edit_key" id="edit_key">
      <label for="edit_value">Edit Value:</label>
      <input type="text" name="edit_value" id="edit_value">
      <button type="submit">Save Changes</button>
    </form>
    <?php if (isset($editedData)): ?>
      <h3>Edited Data (Downloadable):</h3>
      <pre><?php echo $fileContent; ?></pre>

      <a href="data:application/json;charset=utf-8,<?php echo urlencode($editedData); ?>" download="<?php
        // Sanitize filename before download
        $sanitizedName = preg_replace('/[^a-zA-Z0-9._-]/', '', $fileName);
        echo $sanitizedName;
      ?>">Download Edited File</a>

      <?php endif; ?>
  <?php endif; ?>
</body>
</html>
