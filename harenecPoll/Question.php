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
        $query = "SELECT text_q FROM question WHERE question.code = :questionCode";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':questionCode', $questionCode, PDO::PARAM_STR);
        $stmt->execute();
        $question = $stmt->fetch(PDO::FETCH_ASSOC);
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

    public function deleteQuestionsByName($questionName)
    {
        /*
        Delete question by name (MyConsole -> Delete Button)
        */
        $query = "DELETE FROM question WHERE text_q = :questionName";
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
                  SET text_q = :textQ, active = :active, open = :open, id_set = :idSet, creationDate = :creationDate 
                  WHERE text_q = :name";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':textQ', $data['text_q'], PDO::PARAM_STR);
        $stmt->bindParam(':active', $data['active'], PDO::PARAM_INT);
        $stmt->bindParam(':open', $data['open'], PDO::PARAM_INT);
        $stmt->bindParam(':idSet', $data['id_set'], PDO::PARAM_INT);
        $stmt->bindParam(':creationDate', $data['creation_date'], PDO::PARAM_STR);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);

        $result = $stmt->execute();

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function addQuestion($data)
    {
        $query = "INSERT INTO question (text_q, active, open, id_set, creationDate) 
                  VALUES (:textQ, :active, :open, :idSet, :creationDate)";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':textQ', $data['text_q'], PDO::PARAM_STR);
        $stmt->bindParam(':active', $data['active'], PDO::PARAM_INT);
        $stmt->bindParam(':open', $data['open'], PDO::PARAM_INT);
        $stmt->bindParam(':idSet', $data['id_set'], PDO::PARAM_INT);
        $stmt->bindParam(':creationDate', $data['creation_date'], PDO::PARAM_STR);
        $result = $stmt->execute();

        if ($result) {
            return true;
        } else {
            return false;
        }
    }
}
