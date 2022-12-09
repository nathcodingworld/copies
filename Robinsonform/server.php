<?php

$host = "localhost";
// $user = "devmaster_new";
// $ps = "TxSHe6MuiRiu1UP";
// $name = "rbank_crud_app";
$user = "root";
$ps = "";
$name = "rbank";
$charset = "utf8mb4";
$dns =  "mysql:host=" . $host . ";dbname=" . $name . ";charset=" . $charset;
$pdo = new PDO($dns, $user, $ps);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

header("Content-type: application/json");

if (isset($_GET["type"])) {
    if ($_GET["type"] === "read") {
        try {
            $data = $pdo->query('SELECT * FROM rbankform');
            echo json_encode($data->fetchAll(PDO::FETCH_ASSOC));
        } catch (PDOException $e) {
            echo json_encode($e);
        }
    }
}
// asddsa

if (isset($_POST["type"])) {
    if ($_POST["type"] === "create") {
        $lname = "";
        $mname = "";
        $fname = "";
        $phone = 0;
        $address = "";
        $email = "";
        $income = 0;
        $dataone = 0;
        $datatwo = 0;
        if (isset($_POST["lname"])) {
            $lname = $_POST["lname"];
        }
        if (isset($_POST["mname"])) {
            $mname = $_POST["mname"];
        }
        if (isset($_POST["fname"])) {
            $fname = $_POST["fname"];
        }
        if (isset($_POST["phone"])) {
            $phone = $_POST["phone"];
        }
        if (isset($_POST["addres"])) {
            $address = $_POST["addres"];
        }
        if (isset($_POST["email"])) {
            $email = $_POST["email"];
        }
        if (isset($_POST["income"])) {
            $income = $_POST["income"];
        }
        if (isset($_POST["dataone"])) {
            $dataone = $_POST["dataone"];
        }
        if (isset($_POST["datatwo"])) {
            $datatwo = $_POST["datatwo"];
        }
        try {
            $sql = 'INSERT INTO rbankform (fname, mname, lname, phone, addres, email, income, dataone, datatwo) VALUES (:fname, :mname, :lname, :phone, :addres, :email, :income, :dataone, :datatwo)';
            $statement = $pdo->prepare($sql);
            $result = $statement->execute([":fname" => $fname, ":mname" => $mname, ":lname" => $lname, ":phone" => $phone, ":addres" => $address, ":email" => $email, ":income" => $income, ":dataone" => $dataone, ":datatwo" => $datatwo]);
            if ($result === True) {
                $data = $pdo->lastInsertId();
                echo json_encode($data);
            } else {
                echo json_encode($result);
            }
        } catch (PDOException $e) {
            echo json_encode($e);
        }
    }
}


if (isset($_POST["updateid"])) {
    $lname = "";
    $mname = "";
    $fname = "";
    $phone = 0;
    $address = "";
    $email = "";
    $income = 0;
    $dataone = 0;
    $datatwo = 0;
    if (isset($_POST["lname"])) {
        $lname = $_POST["lname"];
    }
    if (isset($_POST["mname"])) {
        $mname = $_POST["mname"];
    }
    if (isset($_POST["fname"])) {
        $fname = $_POST["fname"];
    }
    if (isset($_POST["phone"])) {
        $phone = $_POST["phone"];
    }
    if (isset($_POST["addres"])) {
        $address = $_POST["addres"];
    }
    if (isset($_POST["email"])) {
        $email = $_POST["email"];
    }
    if (isset($_POST["income"])) {
        $income = $_POST["income"];
    }
    if (isset($_POST["dataone"])) {
        $dataone = $_POST["dataone"];
    }
    if (isset($_POST["datatwo"])) {
        $datatwo = $_POST["datatwo"];
    }
    try {
        $result = $pdo->query("update rbankform set fname='" . $fname . "', mname='" . $mname . "', lname='" . $lname . "', phone='" . $phone . "', addres='" . $address . "', email='" . $email . "', income='" . $income . "', dataone='" . $dataone . "', datatwo='" . $datatwo . "' where id=" . $_POST["updateid"]);
        echo json_encode($result);
    } catch (PDOException $e) {
        echo json_encode($e);
    }
}


if (isset($_GET["delid"])) {
    try {
        $result = $pdo->query("delete from rbankform where id=" . $_GET['delid']);
        echo json_encode($result);
    } catch (PDOException $e) {
        echo json_encode($e);
    }
}

// switch ($_GET["type"]) {


//     case "update":
//         if (isset($_GET["id"])) {
//             try {
//                 $data = $pdo->query('SELECT * FROM rbankform where id=' . $_GET["id"]);
//                 echo json_encode($data->fetch(PDO::FETCH_ASSOC));
//             } catch (PDOException $e) {
//                 echo json_encode($e);
//             }
//         } else {
//             try {
//                 $pdo->query("update rbankform set fname='" . $fname . "', mname='" . $mname . "', lname='" . $lname . "', phone='" . $phone . "', addres='" . $address . "', email='" . $email . "', income='" . $income . "', dataone='" . $dataone . "', datatwo='" . $datatwo . "' where id=" . $_POST["id"]);
//                 echo json_encode($msg);
//             } catch (PDOException $e) {
//                 echo json_encode($e);
//             }
//         }
//         break;


//     case "create":
        // $sucessmsg = "Hooray";
        // try {
        //     $sql = 'INSERT INTO rbankform (fname, mname, lname, phone, addres, email, income, dataone, datatwo) VALUES (:fname, :mname, :lname, :phone, :addres, :email, :income, :dataone, :datatwo)';
        //     $statement = $pdo->prepare($sql);
        //     $result = $statement->execute([":fname" => $fname, ":mname" => $mname, ":lname" => $lname, ":phone" => $phone, ":addres" => $address, ":email" => $email, ":income" => $income, ":dataone" => $dataone, ":datatwo" => $datatwo]);
        //     echo json_encode($sucessmsg);
        // } catch (PDOException $e) {
        //     echo json_encode($e);
        // }
//         break;


//     case "delete":
        // $sucessmsg = "Hooray";
        // if (isset($_GET['id'])) {
        //     try {
        //         $data = $pdo->query('SELECT * FROM rbankform where id=' . $_GET["id"]);
        //         echo json_encode($data->fetch(PDO::FETCH_ASSOC));
        //     } catch (PDOException $e) {
        //         echo json_encode($e);
        //     }
        // } else {
        //     try {
        //         $pdo->query("delete from rbankform where id=" . $_GET['delid']);
        //         echo json_encode($msg);
        //     } catch (PDOException $e) {
        //         echo json_encode($e);
        //     }
        // }
//         break;


//     case "read":
//         try {
//             $data = $pdo->query('SELECT * FROM rbankform');
//             echo json_encode($data->fetchAll(PDO::FETCH_ASSOC));
//         } catch (PDOException $e) {
//             echo json_encode($e);
//         }
//         break;


//     default:
//         try {
//             $data = $pdo->query('SELECT * FROM rbankform');
//             echo json_encode($data->fetchAll(PDO::FETCH_ASSOC));
//         } catch (PDOException $e) {
//             echo json_encode($e);
//         }
//         break;
// }
