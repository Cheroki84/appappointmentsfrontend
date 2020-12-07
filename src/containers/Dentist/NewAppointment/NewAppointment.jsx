import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './NewAppointment.scss';
import { connect } from 'react-redux';

const NewAppointment = (props) => {
    const validator = JSON.parse(localStorage.getItem('user'));

    const [search, setSearch] = useState("");

    const searchClients = event => {
      setSearch(event.target.value)
    }

    const searchEngine = (props) => {
      const result = props.clients?.filter(client => {
        return client.nombre.toLowerCase().indexOf(search.toLowerCase()) !== -1
      })
      if (search)
        return result.map(client => <div>{client.nombre}</div>)
    }



    const handleSubmit = event => {
        event.preventDefault();
        const appointment = {
            tipo: event.target.tipo.value,
            descripcion: event.target.descripcion.value,
            precio: event.target.precio.value
        };
        axios.post('http://localhost:8000/api/citas/store', appointment)
            .then(res => {
                console.log(res)
            })
           .catch(error => console.log(error.response))
    }

    const history = useHistory();


    const salir = async() => {
      localStorage.clear();
      await axios.put('https://appappointments.herokuapp.com/users/logout/'+ validator.email)
      await history.push('/');
  }

    return (
      <body className="body">

        <div className="header">
          <div className="buttons">
				    <Link to='/profile'>Back</Link>
          </div>
          <div className="buttons">
            <Link to onClick={salir}>Salir</Link>

          </div>
        </div>

        <div className="containerFormLogin">
          <form className="loginForm" onSubmit={handleSubmit}>
          <input type="text" name="tipo" required placeholder="Introduce un tipo"/>
          <input type="text" name="descripcion" required placeholder="Introduce una descripcion"/>
          <input type="text" name="precio" required placeholder="Introduce un precio"/>
          <input type="text" placeholder="Buscar" onKeyUp={searchClients}></input>
          <div className="listaClientes">
            {searchEngine(props)}
          </div>
          <button type="submit">Crear cita</button>
          </form>            
        </div>
        
      </body>
    )
}

const mapStateToProps = state => {
  return { clients:state.clients }
}

export default connect(mapStateToProps)(NewAppointment);