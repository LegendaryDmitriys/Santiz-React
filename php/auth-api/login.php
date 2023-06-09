<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__.'/bd.php';
require __DIR__.'/jwt.php';

function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}

$db_connection = new Database();
$conn = $db_connection->dbConnection();

$data = json_decode(file_get_contents("php://input"));
$returnData = [];


if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0,404,'Страница не найдена!');


elseif(!isset($data->email)
    || !isset($data->password)
    || empty(trim($data->email))
    || empty(trim($data->password))
):

    $fields = ['fields' => ['email','password']];
    $returnData = msg(0,422,'Пожалуйста, заполните все обязательные поля!',$fields);


else:
    $email = trim($data->email);
    $password = trim($data->password);


    if(!filter_var($email, FILTER_VALIDATE_EMAIL)):
        $returnData = msg(0,422,'Ваш логин должен состоять не менее чем из 6 символов!');

 
    elseif(strlen($password) < 8):
        $returnData = msg(0,422,'Ваш пароль должен состоять не менее чем из 8 символов!');


    else:
        try{

            $fetch_user_by_email = "SELECT * FROM users WHERE email=:email";
            $query_stmt = $conn->prepare($fetch_user_by_email);
            $query_stmt->bindValue(':email', $email,PDO::PARAM_STR);
            $query_stmt->execute();

 
            if($query_stmt->rowCount()):
                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                $check_password = password_verify($password, $row['password']);


                if($check_password):

                    $jwt = new JwtHandler();
                    $token = $jwt->jwtEncodeData(
                        'http://192.168.0.104/auth-api/',
                        array("user_id"=> $row['id'])
                    );

                    $returnData = [
                        'success' => 1,
                        'message' => 'Вы успешно вошли в систему.',
                        'token' => $token
                    ];


                else:
                    $returnData = msg(0,422,'Неверный пароль');
                endif;


            else:
                $returnData = msg(0,422,'Неверная почта!');
            endif;
        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }

    endif;

endif;

echo json_encode($returnData);