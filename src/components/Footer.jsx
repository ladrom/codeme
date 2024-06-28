import {MDBFooter} from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-left footer'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgb(25,118,210)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://ladrom.fr/'>
          ladrom.fr
        </a>
      </div>
    </MDBFooter>
  )
}

export default Footer;