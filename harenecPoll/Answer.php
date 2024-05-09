<?php

class Answer
{

    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAnswersByQuestionId($questionId)
    {
        /*
        Return all answers related to question (MyConsole -> info button)
        */

        $query = "SELECT * FROM answer WHERE id_question = :questionId";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':questionId', $questionId, PDO::PARAM_INT);
        $stmt->execute();
        $answers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $answers;
    }


    public function getAnswersByQuestionName($questionName)
    {
        /*
        Return all answers related to question (MyConsole -> info button)
        */

        $query = "SELECT ans.text_a, ans.correct 
            FROM answer ans
            INNER JOIN question q ON ans.id_question = q.id_question
            WHERE q.text_q = :questionName";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':questionName', $questionName, PDO::PARAM_STR);
        $stmt->execute();
        $answers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $answers;
    }

    public function editAnswerByItsText($answerText, $data)
    {
        $textA = $data['TEXT_A'];
        $correct = $data['CORRECT'];

        $query = "UPDATE answer 
                  SET text_a = :textA, correct = :correct 
                  WHERE text_a = :answerText";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':textA', $textA, PDO::PARAM_STR);
        $stmt->bindParam(':correct', $correct, PDO::PARAM_INT);
        $stmt->bindParam(':answerText', $answerText, PDO::PARAM_STR);
        $result = $stmt->execute();

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function createNewAnswer($data)
    {
        $textA = $data['TEXT_A'];
        $correct = $data['CORRECT'];
        $idQuestion = $data['ID_QUESTION'];

        $query = "INSERT INTO answer (text_a, correct, id_question) 
                  VALUES (:textA, :correct, :idQuestion)";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':textA', $textA, PDO::PARAM_STR);
        $stmt->bindParam(':correct', $correct, PDO::PARAM_INT);
        $stmt->bindParam(':idQuestion', $idQuestion, PDO::PARAM_INT);
        $result = $stmt->execute();

        if ($result) {
            return true;
        } else {
            return false;
        }
    }
}
