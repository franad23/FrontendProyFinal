import './responsescards.css'
import { useState } from 'react'
import { Button, Modal } from 'antd';

function ResponsesCards(props) {
  const [response, setResponse] = useState(props.handleDataResp);
  const [open, setOpen] = useState(false);

  return (
    <div>
        <Modal
        open={open}
        title={response.titleForm.mainTitle}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Cerrar
          </Button>
        ]}
      >
        <h1 className='titleCardResponse'><b>Encuestado: {response.identify}</b> </h1>
        {
          response.userAnswers.map((answer) => (
            <div key={answer.id}>
              <h1 className='titleCardResponse'><b>{answer.questionTitle}</b></h1>
              <ul>
                {answer.answers.map((ans, index) => (
                  Array.isArray(ans) ? (
                    ans.map((subAns, subIndex) => (
                      <li className='liModalCards' key={`${index}-${subIndex}`}>{subAns}</li>
                    ))
                  ) : (
                    <li className='liModalCards' key={index}>{ans}</li>
                  ))
                )}
              </ul>
            </div>
          ))
        }
      </Modal>
    <div className='responseCardContainer' onClick={() => setOpen(true)}>
      <div className='titleCardContainer'>
        <h1 className='titleCardResponse'>Encuestado: {response.identify}</h1>
      </div>
      <div className='InfoCardResponseContainer'>
        <h1 className='titleCardResponse'>Tipo: {response.typeForm}</h1>
      </div>
      <div className='createdAtDateContainer'>
        <span className='spanCards'>Respondido: {response.createdAt.slice(0, 10)}</span>
      </div>
    </div>
    </div>
  )
}

export default ResponsesCards