<?php

class Stat
{

    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function addStat($data)
    {
        try {
            $query = "INSERT INTO stats (id_answer, year)
                  VALUES (:id_answer, :year)";

            $stmt = $this->pdo->prepare($query);
            $stmt->bindParam(':id_answer', $data['id_answer'], PDO::PARAM_INT);
            $stmt->bindParam(':year', $data['year'], PDO::PARAM_INT);

            $result = $stmt->execute();

            return $result;
        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return false;
        }
    }


    public function
    getHistoricStatByQuestionId($setId)
    {
        $query = "SELECT * FROM stats WHERE id_stats = :setId";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':setId', $setId, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $statsById = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $statsById;
        } else {
            return false;
        }
    }

    public function getStatsByQuestionId($questionId)
    {
        $query = "
                SELECT 
            answer_counts.year,
            JSON_OBJECTAGG(answer_counts.text_a, answer_counts.totalCount) AS answers
        FROM (
            SELECT 
                s.year,
                a.text_a,
                COUNT(*) AS totalCount
            FROM 
                stats s
            JOIN 
                answer a ON s.id_answer = a.id_answer
            JOIN 
                question q ON a.id_question = q.id_question
            WHERE 
                a.id_question = :questionId
            GROUP BY 
                s.year, a.text_a
        ) AS answer_counts
        GROUP BY 
            answer_counts.year
        ORDER BY 
            answer_counts.year;

    ";

        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':questionId', $questionId, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $statsById = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $finalResult = [];
            foreach ($statsById as $row) {
                $year = $row['year'];
                $answers = json_decode($row['answers'], true);
                $finalResult[$year] = $answers;
            }

            return $finalResult;
        } else {
            return false;
        }
    }



    



}

?>