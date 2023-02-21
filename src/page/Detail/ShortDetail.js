const ModalPortal = ({ children }) => {
    return ReactDOM.createPortal(children, document.getElementById('modal'));
  };

// Modal.js

const Modal = ({ children, closeModal, isSolid }) => {
    // 모달 닫을 수 있는 로직 모아둔 hook
    useModalClose(closeModal, isSolid);
  
    return (
      <ModalPortal>
        <ModalBackground className="modalspace">{children}</ModalBackground>
      </ModalPortal>
    );
  };
  
  
  // useModalClose.js
  
  const useModalClose = (closeModal, isSolid) => {
    // ESC key 누르면 닫기
    useEffect(() => {
      const closeWithESC = e => {
        if (e.key === 'Escape') {
          closeModal();
        }
      };
      isSolid || window.addEventListener('keydown', closeWithESC);
      return () => window.removeEventListener('keydown', closeWithESC);
    }, []);
  
    // modal 창 열리면 외부 scroll 금지
    useEffect(() => {
      document.body.style.cssText = "overflow: 'hidden'";
    
      return () => (document.body.style.cssText = "overflow :'unset'");
    }, []);
  
    return;
  };