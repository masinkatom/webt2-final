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
    editUserByName($data){
        $query = "UPDATE user 
                  SET nick = :nick 
                  WHERE user.nick = :userName";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':userName', $data['oldname'], PDO::PARAM_STR);
        $stmt->bindParam(':nick', $data['username'], PDO::PARAM_STR);

        $result = $stmt->execute();

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function
    setUserFlag($userName, $data){
        $query = "UPDATE user 
                  SET admin = :adminValue 
                  WHERE user.nick = :userName";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':userName', $userName, PDO::PARAM_STR);
        $stmt->bindParam(':adminValue', $data['adminValue'], PDO::PARAM_STR);

        $result = $stmt->execute();

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function
    getUserIdByName($userName){
        $query = "SELECT id_user
                  FROM user 
                  WHERE nick = :userName";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':userName', $userName);
        $stmt->execute();
        $userId = $stmt->fetchColumn();
        return $userId;
    }

    public function
    returnAllUsersName(){
         $query = "SELECT nick
                   FROM user";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        $allUsers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $allUsers;
    }
}
?>