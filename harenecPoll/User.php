<?php

class User
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function deleteUserByName($userName){

        /*
            delete user by userName
        */
        $query = "DELETE FROM user WHERE user.nick = :userName";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':userName', $userName, PDO::PARAM_STR);
        $result = $stmt->execute();

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function
    editUserByName($userName, $data){
        $query = "UPDATE user 
                  SET nick = :nick 
                  WHERE user.nick = :userName";


        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':userName', $userName, PDO::PARAM_STR);
        $stmt->bindParam(':nick', $data['nick'], PDO::PARAM_STR);

        $result = $stmt->execute();

        if ($result) {
            return true;
        } else {
            return false;
        }
    }
}
?>