<?php

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

function randHash($len = 32)
{
    return substr(md5(openssl_random_pseudo_bytes(20)), -$len);
}

$host = "localhost";
$user = "devmaster_new";
$ps = "TxSHe6MuiRiu1UP";
$name = "partialform";
// $user = "root";
// $ps = "";
// $name = "partialform";
$charset = "utf8mb4";
$dns =  "mysql:host=" . $host . ";dbname=" . $name . ";charset=" . $charset;
$pdo = new PDO($dns, $user, $ps);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

header("Content-type: application/json");

$reffid = randHash(10);


$detcode = "-";
$brand = "";
$apptype = "";
$purpose = "";
$fname = "";
$mname = "";
$lname = "";
$birthday = "";
$birthplace = "";
$alias = "";
$civilstatus = "";
$gender = "";
$nationality = "";
$religion = "";
$contact = "";
$email = "";
$currhouse = "";
$currstreet = "";
$currsubd = "";
$currbrng = "";
$currprov = "";
$currtown = "";
$permhouse = "";
$permstreet = "";
$permsubd = "";
$permbrng = "";
$permprov = "";
$permtown = "";
$provhouse = "";
$provstreet = "";
$provsubd = "";
$provbrng = "";
$provprov = "";
$provtown = "";
$employmenttype = "";
$employmentstat = "";
$employername = "";
$position = "";
$servicelength = "";
$employeraddress = "";
$employercontact = "";
$employertel = "";
$position = "";
$grossincome = "";
$othersource = "";
$expences = "";

$dependents = [];
$charreff = [];
$charreffnorel = [];


if (isset($_POST["detcode"])) {
    $detcode = $_POST["detcode"];
}
if (isset($_POST["brand"])) {
    $brand = $_POST["brand"];
}
if (isset($_POST["apptype"])) {
    $apptype = $_POST["apptype"];
}
if (isset($_POST["purpose"])) {
    $purpose = $_POST["purpose"];
}
if (isset($_POST["fname"])) {
    $fname = $_POST["fname"];
}
if (isset($_POST["mname"])) {
    $mname = $_POST["mname"];
}
if (isset($_POST["lname"])) {
    $lname = $_POST["lname"];
}
if (isset($_POST["birthday"])) {
    $birthday = $_POST["birthday"];
}
if (isset($_POST["birthplace"])) {
    $birthplace = $_POST["birthplace"];
}
if (isset($_POST["alias"])) {
    $alias = $_POST["alias"];
}
if (isset($_POST["civilstatus"])) {
    $civilstatus = $_POST["civilstatus"];
}
if (isset($_POST["gender"])) {
    $gender = $_POST["gender"];
}
if (isset($_POST["nationality"])) {
    $nationality = $_POST["nationality"];
}
if (isset($_POST["religion"])) {
    $religion = $_POST["religion"];
}
if (isset($_POST["contact"])) {
    $contact = $_POST["contact"];
}
if (isset($_POST["email"])) {
    $email = $_POST["email"];
}
if (isset($_POST["currhouse"])) {
    $currhouse = $_POST["currhouse"];
}
if (isset($_POST["currstreet"])) {
    $currstreet = $_POST["currstreet"];
}
if (isset($_POST["currsubd"])) {
    $currsubd = $_POST["currsubd"];
}
if (isset($_POST["currbrng"])) {
    $currbrng = $_POST["currbrng"];
}
if (isset($_POST["currprov"])) {
    $currprov = $_POST["currprov"];
}
if (isset($_POST["currtown"])) {
    $currtown = $_POST["currtown"];
}
if (isset($_POST["permhouse"])) {
    $permhouse = $_POST["permhouse"];
}
if (isset($_POST["permstreet"])) {
    $permstreet = $_POST["permstreet"];
}
if (isset($_POST["permsubd"])) {
    $permsubd = $_POST["permsubd"];
}
if (isset($_POST["permbrng"])) {
    $permbrng = $_POST["permbrng"];
}
if (isset($_POST["permprov"])) {
    $permprov = $_POST["permprov"];
}
if (isset($_POST["permtown"])) {
    $permtown = $_POST["permtown"];
}
if (isset($_POST["provhouse"])) {
    $provhouse = $_POST["provhouse"];
}
if (isset($_POST["provstreet"])) {
    $provstreet = $_POST["provstreet"];
}
if (isset($_POST["provsubd"])) {
    $provsubd = $_POST["provsubd"];
}
if (isset($_POST["provbrng"])) {
    $provbrng = $_POST["provbrng"];
}
if (isset($_POST["provprov"])) {
    $provprov = $_POST["provprov"];
}
if (isset($_POST["provtown"])) {
    $provtown = $_POST["provtown"];
}
if (isset($_POST["employmenttype"])) {
    $employmenttype = $_POST["employmenttype"];
}
if (isset($_POST["employmentstat"])) {
    $employmentstat = $_POST["employmentstat"];
}
if (isset($_POST["employername"])) {
    $employername = $_POST["employername"];
}
if (isset($_POST["servicelength"])) {
    $servicelength = $_POST["servicelength"];
}
if (isset($_POST["employeraddress"])) {
    $employeraddress = $_POST["employeraddress"];
}
if (isset($_POST["employercontact"])) {
    $employercontact = $_POST["employercontact"];
}
if (isset($_POST["employertel"])) {
    $employertel = $_POST["employertel"];
}
if (isset($_POST["position"])) {
    $position = $_POST["position"];
}
if (isset($_POST["grossincome"])) {
    $grossincome = $_POST["grossincome"];
}
if (isset($_POST["othersource"])) {
    $othersource = $_POST["othersource"];
}
if (isset($_POST["expences"])) {
    $expences = $_POST["expences"];
}

if (isset($_POST["dependents"])) {
    $depjson = $_POST["dependents"];
    $dependents = json_decode($depjson, true);
}
if (isset($_POST["charreff"])) {
    $charrjson = $_POST["charreff"];
    $charreff = json_decode($charrjson, true);
}
if (isset($_POST["charreffnorel"])) {
    $charrnrjson = $_POST["charreffnorel"];
    $charreffnorel = json_decode($charrnrjson, true);
}
$msg = "HOORAY";
$nosuccess = "failed";
try {
    $sql = 'INSERT INTO mainform (detcode, brand, apptype, purpose, fname, mname, lname, birthday, birthplace, alias, civilstatus, gender, nationality, religion, contact, email, currhouse, currstreet, currsubd, currbrng, currprov, currtown, permhouse, permstreet, permsubd, permbrng, permprov, permtown, provhouse, provstreet, provsubd, provbrng, provprov, provtown, employmenttype, employmentstat, employername, servicelength, employeraddress, employercontact, employertel, position, grossincome, othersource, expences, reffid) VALUES (:detcode, :brand, :apptype, :purpose, :fname, :mname, :lname, :birthday, :birthplace, :alias, :civilstatus, :gender, :nationality, :religion, :contact, :email, :currhouse, :currstreet, :currsubd, :currbrng, :currprov, :currtown, :permhouse, :permstreet, :permsubd, :permbrng, :permprov, :permtown, :provhouse, :provstreet, :provsubd, :provbrng, :provprov, :provtown, :employmenttype, :employmentstat, :employername, :servicelength, :employeraddress, :employercontact, :employertel, :position, :grossincome, :othersource, :expences, :reffid)';
    $statement = $pdo->prepare($sql);
    $result = $statement->execute([":detcode" => $detcode, ":brand" => $brand, ":apptype" => $apptype, ":purpose" => $purpose, ":fname" => $fname, ":mname" => $mname, ":lname" => $lname, ":birthday" => $birthday, ":birthplace" => $birthplace, ":alias" => $alias, ":civilstatus" => $civilstatus, ":gender" => $gender, ":nationality" => $nationality, ":religion" => $religion, ":contact" => $contact, ":email" => $email, ":currhouse" => $currhouse, ":currstreet" => $currstreet, ":currsubd" => $currsubd, ":currbrng" => $currbrng, ":currprov" => $currprov, ":currtown" => $currtown, ":permhouse" => $permhouse, ":permstreet" => $permstreet, ":permsubd" => $permsubd, ":permbrng" => $permbrng, ":permprov" => $permprov, ":permtown" => $permtown, ":provhouse" => $provhouse, ":provstreet" => $provstreet, ":provsubd" => $provsubd, ":provbrng" => $provbrng, ":provprov" => $provprov, ":provtown" => $provtown, ":employmenttype" => $employmenttype, ":employmentstat" => $employmentstat, ":employername" => $employername, ":servicelength" => $servicelength, ":employeraddress" => $employeraddress, ":employercontact" => $employercontact, ":employertel" => $employertel, ":position" => $position, ":grossincome" => $grossincome, ":othersource" => $othersource, ":expences" => $expences, ":reffid" => $reffid]);
    if ($result === True) {
        $insertedid = $pdo->lastInsertId();
        foreach ($dependents as &$dep) {
            $sqldep = 'INSERT INTO depform (reffid, parentid, fullname, age, relation, occupation ) VAlUES (:reffid, :parentid, :fullname, :age, :relation, :occupation)';
            $statementdep = $pdo->prepare($sqldep);
            $statementdep->execute([":reffid" => $reffid, ":parentid" => $insertedid, ":fullname" => $dep["name"], ":age" => $dep["age"], ":relation" => $dep["relation"], ":occupation" => $dep["occupation"]]);
        }
        foreach ($charreff as &$charr) {
            $sqlcharr = 'INSERT INTO reffform (reffid, parentid, relatives, fname, mname, lname, contact, raddress ) VAlUES (:reffid, :parentid, :relatives, :fname, :mname, :lname, :contact, :raddress)';
            $statementcharr = $pdo->prepare($sqlcharr);
            $statementcharr->execute([":reffid" => $reffid, ":parentid" => $insertedid, ":relatives" => 1, ":fname" => $charr["fname"], ":mname" => $charr["mname"], ":lname" => $charr["lname"], ":contact" => $charr["contanct"], ":raddress" => $charr["adress"]]);
        }
        foreach ($charreffnorel as &$charrnr) {
            $sqlcharrnr = 'INSERT INTO reffform (reffid, parentid, relatives, fname, mname, lname, contact, raddress ) VAlUES (:reffid, :parentid, :relatives, :fname, :mname, :lname, :contact, :raddress)';
            $statementcharrnr = $pdo->prepare($sqlcharrnr);
            $statementcharrnr->execute([":reffid" => $reffid, ":parentid" => $insertedid, ":relatives" => 0, ":fname" => $charrnr["fname"], ":mname" => $charrnr["mname"], ":lname" => $charrnr["lname"], ":contact" => $charrnr["contanct"], ":raddress" => $charrnr["adress"]]);
        }
        //Server settings
        $mail->SMTPDebug = 0;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.sendgrid.net';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'apikey';                     //SMTP username
        $mail->Password   = '';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('nathaniel.morales@gdi.com.ph', 'nathan');
        $mail->addAddress('nathaniel.1stacc@gmail.com');     //Add a recipient
        $mail->addAddress('oliver.saguibo@gdi.com.ph');     //Add a recipient
        // $mail->addAddress('ellen@example.com');               //Name is optional
        $mail->addReplyTo('nathaniel.morales@gdi.com.ph', 'nathan');
        // $mail->addCC('cc@example.com');
        // $mail->addBCC('bcc@example.com');


        //Attachments
        // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
        $body = "Thank you for submitting your application loan with robinsons bank, <br> your application is now processing, your refference id is <b>" . $reffid . "</b>";
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'this is test email for Application Form';
        $mail->Body    =  $body;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
        $mail->send();

        echo json_encode($reffid);
    } else {
        echo json_encode($nosuccess);
    }
} catch (Exception $e) {
    echo json_encode($e);
}
