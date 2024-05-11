function createStat(data){

    //funkcia berie pole data (sam to konvertne do stringyfyJSON a potom v api.php to
        //dekoduje spat)

    /*
    struktura by mala byt: data[
        {
            id_answer: 'value',
            count: 'value'
        }
    ]
    */
    

    fetch(`https://node24.webte.fei.stuba.sk/web2final/harenecPoll/api.php/createStat`,{
        method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
        if (response.ok) {
            console.log('Stat created successfully');
        } else {
            console.error('Failed to create stat');
        }
    })
        .catch(error => {
            console.error('Error:', error);
        });
    }

