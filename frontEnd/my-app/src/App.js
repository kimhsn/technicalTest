import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import axios from 'axios';

const URL = 'http://localhost:8080/establishment'

const App = () => {
    const [establishments, setEstablishments] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        setEstablishments(response.data)
    }
    
    const removeEstablishments = (id) => {

        axios.delete(`${URL}/delete/${id}`).then(res => {
            const del = establishments.filter(establishment => id !== establishment.id)
            setEstablishments(del)
        })
    }

    const renderHeader = () => {
        let headerElements = ['id', 'Type d\'etablissement','Etablissement', 'Email',  'Operation']
        return headerElements.map((key, index) => {
            return <Th key={index}>{key.toUpperCase()}</Th>
        })
    }

    const renderBody = () => {
        return establishments && establishments.map(({ id, etablissement_type, etablissement ,mail}) => {
            return (
                <Tr key={id}>
                    <Td>{id}</Td>
                    <Td>{etablissement_type}</Td>
                    <Td>{etablissement}</Td>
                    <Td>{mail}</Td>
                    <Td>
                        <button onClick={() => removeEstablishments(id)}>Supprimer</button>
                    </Td>
                </Tr>
            )
        })
    }

    return (
      <ChakraProvider>
          <Box p={6}>
            <h1>Liste des établissements disponibles :</h1>
            <TableContainer>
              <Table variant='striped' colorScheme='teal'>
                <Thead>
                    <Tr>{renderHeader()}</Tr>
                </Thead>
                <Tbody>
                    {renderBody()}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
      </ChakraProvider>    )
}


export default App