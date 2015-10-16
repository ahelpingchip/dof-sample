<!doctype html>
<html>

<head>
  <meta charset="UTF-8">
  <title>DOF Charts Backend</title>
  <link rel="stylesheet" href=".style.css">

</head>

<body>

  <div id="container">
    <h1>Upload Data</h1>

   	<form id="newfile" enctype="multipart/form-data" action=".ingest.php" method="POST">
      Please choose a file:
      <input name="uploaded" type="file" />
      <br />
      <input type="submit" value="Upload" />
    </form>
  
    <h1>Currently Uploaded Data</h1>
    
    <table class="sortable">
      <thead>
        <tr>
          <th>Filename <small>(click to download)</small></th>
          <th>Size <small>(bytes)</small></th>
          <th>Date Modified</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      <?php

        $myDirectory=opendir(".");
        
        // Gets each entry
        while($entryName=readdir($myDirectory)) {
          $dirArray[]=$entryName;
        }
        
        // Finds extensions of files
        function findexts ($filename) {
          $filename=strtolower($filename);
          $exts=split("[/\\.]", $filename);
          $n=count($exts)-1;
          $exts=$exts[$n];
          return $exts;
        }
        
        // Closes directory
        closedir($myDirectory);
        
        // Counts elements in array
        $indexCount=count($dirArray);
        
        // Sorts files
        sort($dirArray);
        
        // Loops through the array of files
        for($index=0; $index < $indexCount; $index++) {
        
          // Allows ./?hidden to show hidden files
          // if($_SERVER['QUERY_STRING']=="hidden")
          // {$hide="";
          // $ahref="./";
          // $atext="Hide";}
          // else
          // {
          $hide=".";
          $hide2="_";
          // $ahref="./?hidden";
          // $atext="Show";}
          if((substr("$dirArray[$index]", 0, 1) != $hide) && (substr("$dirArray[$index]", 0, 1) != $hide2)) {
          
          // Gets File Names
          $name=$dirArray[$index];
          $namehref=$dirArray[$index];
          
          // Gets Extensions 
          $extn=findexts($dirArray[$index]); 
          
          // Gets file size 
          $size=number_format(filesize($dirArray[$index]));
          
          // Gets Date Modified Data
          $modtime=date("M j Y g:i A", filemtime($dirArray[$index]));
          $timekey=date("YmdHis", filemtime($dirArray[$index]));
          
          // Separates directories
          if(is_dir($dirArray[$index])) {
            $extn="&lt;Directory&gt;"; 
            $size="&lt;Directory&gt;"; 
            $class="dir";
          } else {
            $class="file";
          }
          
          // Cleans up . and .. directories 
          if($name=="."){$name=". (Current Directory)"; $extn="&lt;System Dir&gt;";}
          if($name==".."){$name=".. (Parent Directory)"; $extn="&lt;System Dir&gt;";}
          
          // Print 'em
          print("
          <tr class='$class'>
            <td><a href='./$namehref'>$name</a></td>
            <td>$size</td>
            <td sorttable_customkey='$timekey'>$modtime</td>
            <td><form action='.actions.php' method='post'>
                <input type='hidden' name='fileToDelete' value='$namehref'>
                <input type='submit' value='Delete'>
                </form>
            </td>
          </tr>");
          }
        }
      ?>
      </tbody>
    </table>
  
    <h2><?php // print("<a href='$ahref'>$atext hidden files</a>"); ?></h2>
    
  </div>
  
</body>

</html>
