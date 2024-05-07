Step 1 Source: a user can craft an HTTP request with malicious content
Source
edt.php:9
$message = '';

if (isset($_FILES['json_file'])) {
  $file = $_FILES['json_file'];
  $fileName = $file['name'];
  $fileTmpName = $file['tmp_name'];
  $fileSize = $file['size'];
Step 2 A malicious value can be assigned to variable ‘$fileName’
edt.php:9
$message = '';

if (isset($_FILES['json_file'])) {
  $file = $_FILES['json_file'];
  $fileName = $file['name'];
  $fileTmpName = $file['tmp_name'];
  $fileSize = $file['size'];
Step 3 Sink: this invocation is not safe; a malicious value can be used as argument
Sink
edt.php:82
    </form>
    <?php if (isset($editedData)): ?>
      <h3>Edited Data (Downloadable):</h3>
      <pre><?php echo $fileContent; ?></pre>
Change this code to not reflect user-controlled data. See more on SonarCloud

      <a href="data:application/json;charset=utf-8,<?php echo urlencode($editedData); ?>" download="<?php
        // Sanitize filename before download
