<?php

class Question
{

    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAllQuestions()
    {
        /*
        Return all questions (Mainly for ADMIN)
        */
        $query = "SELECT * FROM question";
        $stmt = $this->pdo->query($query);
        $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $questions;
    }

    public function getQuestionsBySetId($setId)
    {
        /*
        Return questions contained in specific set (by setId)
        */
        $query = "SELECT * FROM question WHERE id_set = :setId";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':setId', $setId, PDO::PARAM_INT);
        $stmt->execute();
        $questionsBySet = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $questionsBySet;
    }

    public function getQuestionByCode($questionCode)
    {
        //pridat question.codes
        $query = "SELECT * FROM question WHERE question.code = :questionCode";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':questionCode', $questionCode, PDO::PARAM_STR);
        $stmt->execute();
        $question = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $question;
    }

    public function getActiveQuestion($question)
    {
        $query = "SELECT active FROM question WHERE text_q = :question";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':question', $question, PDO::PARAM_STR);
        $stmt->execute();
        $isActiveQuestion = $stmt->fetchColumn();

        if ($isActiveQuestion == 1) {
            return true;
        } else {
            return false;
        }
    }

    public function getQuestionIdByName($questionName)
    {
        /*
        Return question ID by its name (Part of MyConsole -> Info Button)
        */
        $query = "SELECT id_question FROM question WHERE text_q = :questionName";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':questionName', $questionName, PDO::PARAM_STR);
        $stmt->execute();
        $questionId = $stmt->fetchColumn();
        return $questionId;
    }


    public function getAllQUestionsByUserId($userId){

        /*
            return all question by username
        */
        
        $query = "SELECT *
          FROM question q
          INNER JOIN question_set qs ON qs.id_set = q.id_set
          WHERE qs.id_user = :userId";


        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();
        $questionsByUserId = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $questionsByUserId;


    }

    public function deleteQuestionsByName($questionName)
    {
        /*
        Delete question by name (MyConsole -> Delete Button)
        */
        $query = "DELETE FROM question WHERE id_question = :questionName";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':questionName', $questionName, PDO::PARAM_STR);
        $result = $stmt->execute();

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function editQuestionByName($name, $data)
    {

        $query = "UPDATE question 
                  SET text_q = :textQ, creationDate = :creationDate 
                  WHERE id_question = :name";


        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':textQ', $data['text_q'], PDO::PARAM_STR);
        $stmt->bindParam(':creationDate', $data['creationDate'], PDO::PARAM_STR);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        
        $result = $stmt->execute();

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function
    editActiveQuestion($questionActiveUpdate){
        $query = "UPDATE question
                  SET active = 1
                  WHERE  id_question = :questionActiveUpdate";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':questionActiveUpdate', $questionActiveUpdate, PDO::PARAM_STR);
        $result = $stmt->execute();

        if ($result) {
            return true;
        } else {
            return false;
        }
        

    }

    //OPRAVENE NA PDO
    public function getQuestionInfo($info){
        $query = "SELECT * FROM question WHERE text_q = :info";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':info', $info, PDO::PARAM_STR);
        $stmt->execute();
        $questionsBySet = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $questionsBySet;

    }

    public function addQuestion($data)
    {
        print_r($data);
        $query = "INSERT INTO question (text_q, active, open, id_set, creationDate, cloudmap, adminOwner) 
                  VALUES (:textQ, :active, :open, :idSet, :creationDate, :cloudmap, :adminOwner)";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':textQ', $data['question'], PDO::PARAM_STR);
        $stmt->bindParam(':active', $data['active'], PDO::PARAM_INT);
        $stmt->bindParam(':open', $data['open'], PDO::PARAM_INT);
        $stmt->bindParam(':idSet', $data['name_set'], PDO::PARAM_INT);
        $stmt->bindParam(':creationDate', $data['creationDate'], PDO::PARAM_STR);
        $stmt->bindParam(':cloudmap', $data['cloudmap'], PDO::PARAM_STR);
        $stmt->bindParam(':adminOwner', $data['admin_owner'], PDO::PARAM_STR);
        $result = $stmt->execute();

        if ($result) {
            return true;
        } else {
            return false;
        }
    }


    public function addSet($data)
    {
        $query = "INSERT INTO question_set (name_set, id_user) 
                  VALUES (:setName, :id_user)";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':setName', $data['setName'], PDO::PARAM_STR);
        $stmt->bindParam(':id_user', $data['userName'], PDO::PARAM_STR);
        $result = $stmt->execute();

        if ($result) {
            return true;
        } else {
            return false;
        }
    }
}
