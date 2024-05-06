<?php

class Answer
{

    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function getAnswersByQuestionId($questionId)
    {
        /*
        Return all answers related to question (MyCOnsole -> info button)
        */

        $query = "SELECT * FROM answer where id_question = $questionId";
        $result = mysqli_query($this->conn, $query);
        $answers = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $answers[] = $row;
        }
        return $answers;
    }


    public function getAnswersByQuestionName($questionName)
    {
        /*
        Return all answers related to question (MyCOnsole -> info button)
        */

        $query = "SELECT text_a 
            FROM answer ans
            INNER JOIN question q ON ans.id_question = q.id_question
            WHERE q.text_q = '$questionName'";
        $result = mysqli_query($this->conn, $query);
        $answers = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $answers[] = $row;
        }
        return $answers;
    }

    public function editAnswerByItsText($answerText, $data)
    {
        $textA = $data['TEXT_A'];
        $correct = $data['CORRECT'];

        $query = "UPDATE answer 
                  SET text_a = '$textA', correct = $correct 
                  WHERE text_a = '$answerText'";

        $result = mysqli_query($this->conn, $query);

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

        $textA = mysqli_real_escape_string($this->conn, $textA);
        $correct = mysqli_real_escape_string($this->conn, $correct);
        $idQuestion = mysqli_real_escape_string($this->conn, $idQuestion);

        $query = "INSERT INTO answer (text_a, correct, id_question) 
                  VALUES ('$textA', $correct, $idQuestion)";

        $result = mysqli_query($this->conn, $query);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }
}
