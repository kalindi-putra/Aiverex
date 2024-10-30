import { Button, Modal } from 'antd';
import { useState } from 'react';
const CustModal = (props) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      {/* <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal of 1000px width
      </Button> */}
      <Modal
        centered
        open={open}
        onOk={() => {setOpen(false)
          props.onClose(false)
        }}
        onCancel={() =>{ setOpen(false)
        props.onClose(false)
      }
        }
        width={1000}
      >
        <p>{props.text}</p>
      </Modal>
    </>
  );
};
export default CustModal;