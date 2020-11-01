const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SKRIPSI',
  password: 'oka123!!',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getOrder = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM public.orders where medical_number = 191209200 ORDER BY medical_number ASC, order_cd ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM laboratories', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getdetail = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * from orderdetails where order_cd = $1',[request.query.order_cd], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getOrderList = (request, response) => {
  const id = parseInt(request.params.id)
const lab_id = parseInt(request.query.lab_id)
  pool.query('SELECT * FROM orderlist WHERE lab_id = $1', [request.query.lab_id], (error, results) => {
    if (error) {
      throw error
    }
    
    response.status(200).json(results.rows)
  })
}
const getschedule = (request, response) => {
  pool.query(`select distinct * from schedule where  examination_date = now()::date order by queue`,  (error, results) => {
    if (error) {
      throw error
    }
    
    response.status(200).json(results.rows)
  })
}
const getresult = (request, response) => {
  pool.query(`select * from result join orderlist join laboratories on laboratories.lab_id = orderlist.lab_id on orderlist.order_cd = result.order_code where result_no = true`,  (error, results) => {
    if (error) {
      throw error
    }
    
    response.status(200).json(results.rows)
  })
}
  
const insertorder = (request, response) => {
  
  pool.query(
    `SELECT public.insertorder(
      191209200, 
    $1,
    cast ($2 as int),
    cast ($3 as int)
  )`
  
  , [request.query.order_code,request.query.quantity,request.query.price], (error, results) => {
    if (error) {
      throw error
    }
    console.log("this is order id : ",request.query.order_code);
    console.log("this is qty id : ",request.query.quantity);
    console.log("this is prc id : ",request.query.price);
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  getOrderList,
  insertorder,
  getOrder,
  getschedule,
  getdetail,
  getresult,
  createUser,
  updateUser,
  deleteUser,
}