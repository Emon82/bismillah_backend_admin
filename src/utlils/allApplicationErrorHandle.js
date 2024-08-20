import Notification from './notification'
const allApplicationErrorHandle=(err)=>{
    if (err.response) {
        Notification(err.response.data.msg,"warning",1500)
      } else if (err.request) {
        Notification('Network Error',"warning",1500)
      } else {
        Notification('Something went wrong',"warning",1500)
      }
  
  }
  
  export default allApplicationErrorHandle;
