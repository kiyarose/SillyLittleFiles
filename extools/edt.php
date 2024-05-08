Source
edt.php:9
$message = '';

if (isset($_FILES['json_file'])) {
  $file = $_FILES['json_file'];
  $fileName = $file['name'];
  $fileTmpName = $file['tmp_name'];
  $fileSize = $file['size'];
edt.php:9
$message = '';

if (isset($_FILES['json_file'])) {
  $file = $_FILES['json_file'];
  $fileName = $file['name'];
  $fileTmpName = $file['tmp_name'];
  $fileSize = $file['size'];
edt.php:82
    </form>
    <?php if (isset($editedData)): ?>
      <h3>Edited Data (Downloadable):</h3>
      <pre><?php echo $fileContent; ?></pre>
      <a href="data:application/json;charset=utf-8,<?php echo urlencode($editedData); ?>" download="<?php
