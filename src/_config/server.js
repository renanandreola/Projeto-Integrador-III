if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const Order = require('../models/Order');
const Client = require('../models/Client');
const Machine = require('../models/Machine');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('cookie-session');
const initializePassport = require('./auth');
initializePassport(passport);
const {isAdmin} = require('../helpers/isAdmin');
const search = require('../helpers/search');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const nunjucks = require('nunjucks');

module.exports = () => {
    var port = process.env.PORT || 3000;

    let env = nunjucks.configure('views', {
        autoescape: true,
        express: app
    });
    
    app.set('engine', env);
    
    require('useful-nunjucks-filters')(env);
    
    app.listen(port, () => {
        console.log('[LISTEN ON PORT ' + port + ']');
    });
    
    //FLASH
    app.use(flash());

    //SESSION
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }));

    //PASSPORT
    app.use(passport.initialize());
    app.use(passport.session());

    //MIDDLEWARE
    app.use((req, res, next) => {
        res.locals.user = req.user || null;
        next();
    });

    //BODYPARSER
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
    }));
    app.use(express.static('public'));
    
    //ROUTES

    //PRINCIPAL
    app.get('/admin', isAdmin, (req, res) => {
        res.render('index.html');
        // console.log(req);
    });
    
    app.get('/admin/login', (req, res) => {
        // if(req.isAuthenticated()){
        //     return res.redirect("/");
        // }
        res.render('login.html');
    });
    
    //LOGIN
    app.post('/admin/login', passport.authenticate('local', {
        failureRedirect: '/admin/login',
        successRedirect: '/admin',
        failureFlash: true
    }), (req, res, next) => {
        res.redirect('/admin');
    });
    
    app.get('/admin/logout', isAdmin, (req, res) => {
        req.logout();
        res.redirect('/admin/login');
    });

    //CLIENTS
        //PRINCIPAL - LIST - FILTER
    app.get('/admin/clients', isAdmin, (req, res) => {
        Client.findAll()
        .then((clients) => {
            res.render('clients/index.html', {clients: clients});
        }).catch((err) => {
            console.log("err: ", err);
        });
    });
    
    app.get('/admin/clients/index', isAdmin, (req, res) => {
        res.redirect('/admin/clients');
    }); 
    
        //ADD
    app.get('/admin/clients/add', isAdmin, (req, res) => {
        res.render('clients/add.html');
    }); 
    
    app.post('/admin/clients/add', isAdmin, (req, res) => {
        var name = req.body.name;
        // var lastname = req.body.lastname;
        var email = req.body.email;
        var phone = req.body.phone;
        var cell = req.body.cell;
        var cep = req.body.cep;
        var state = req.body.state;
        var city = req.body.city;
        var district = req.body.district;
        var address = req.body.address;
        var number = req.body.number;
        var complement = req.body.complement;
    
        var validateInput = /[@!#$%^&*()='+_"?°~`<>{}123456789\\]/;
        var validateInput2 = /[@!#$%^&*()='+_"?°~`<>{}\\]/;
        var regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
        if(name == "" || validateInput.test(name) == true) {
            req.flash('error', 'Nome do cliente inválido');
            return sendRequestDataClient('name');
        }
    
        // if(lastname == "" || validateInput.test(lastname) == true) {
        //     req.flash('error', 'Sobrenome do cliente inválido');
        //     return sendRequestDataClient('lastname');
        // }
    
        if(email == "" || regexEmail.test(email) == false) {
            req.flash('error', 'E-mail do cliente inválido');
            return sendRequestDataClient('email');
        }
    
        if(phone == "" || phone.length != 14) {
            req.flash('error', 'Telefone do cliente inválido');
            return sendRequestDataClient('phone');
        }
    
        if(cell == "" || cell.length != 16) {
            req.flash('error', 'Celular do cliente inválido');
            return sendRequestDataClient('cell');
        }
    
        if(cep == "" || cep.length != 9) {
            req.flash('error', 'CEP do cliente inválido');
            return sendRequestDataClient('cep');
        }
    
        if(city == "" || validateInput.test(city) == true) {
            req.flash('error', 'Cidade do cliente inválido');
            return sendRequestDataClient('city');
        }
    
        if(district == "" || validateInput2.test(district) == true) {
            req.flash('error', 'Bairro do cliente inválido');
            return sendRequestDataClient('district');
        }
    
        if(address == "" || validateInput2.test(address) == true) {
            req.flash('error', 'Endereço do cliente inválido');
            return sendRequestDataClient('address');
        }
    
        if(number == "" || validateInput2.test(number) == true) {
            req.flash('error', 'Número do cliente inválido');
            return sendRequestDataClient('number');
        }
    
        if(complement == "" || validateInput2.test(complement) == true) {
            req.flash('error', 'Complemento do cliente inválido');
            return sendRequestDataClient('complement');
        }
    
        function sendRequestDataClient(input) {
            return res.render('orders/add.html', {
                cellphone: cell,
                cep: cep,
                city: city,
                district: district,
                address: address,
                number_address: number,
                complement: complement,
                email: email,
                state: state,
                username: name,
                phone: phone,
                input: input,
            });
        }
    
        Client.create({
            cellphone: req.body.cell,
            cep: req.body.cep,
            city: req.body.city,
            district: req.body.district,
            address: req.body.address,
            number_address: req.body.number,
            complement: req.body.complement,
            email: req.body.email,
            state: req.body.state,
            username: req.body.name,
            phone: req.body.phone
        }).then(function() {
            req.flash('success', 'Cliente cadastrado com sucesso');
            res.redirect('/admin/clients');
        }).catch(function(error) {
            req.flash('error', 'Não foi possível cadastrar o cliente com sucesso. Erro: ' + error);
            res.redirect('/admin/clients');
        });
        // res.render('clients/add.html');
    }); 

        //EDIT
    app.get('/admin/clients/edit/:id', isAdmin, (req, res) => {
        var id = req.params.id;
    
        Client.findOne({
            where: {
                id: id
            },
    
        }).then((client) => { 
            res.render('clients/edit.html', {
                username: client.username,
                email: client.email,
                phone: client.phone,
                cellphone: client.cellphone,
                cep: client.cep,
                city: client.city,
                district: client.district,
                address: client.address,
                number_address: client.number_address,
                complement: client.complement,
                id: id
            });
        })
    });

    app.post('/admin/clients/edit/:id', isAdmin, (req, res) => {
        var id = req.params.id;
        var name = req.body.name;
        // var lastname = req.body.lastname;
        var email = req.body.email;
        var phone = req.body.phone;
        var cell = req.body.cell;
        var cep = req.body.cep;
        var state = req.body.state;
        var city = req.body.city;
        var district = req.body.district;
        var address = req.body.address;
        var number = req.body.number;
        var complement = req.body.complement;
    
        var validateInput = /[@!#$%^&*()='+_"?°~`<>{}123456789\\]/;
        var validateInput2 = /[@!#$%^&*()='+_"?°~`<>{}\\]/;
        var regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
        if(name == "" || validateInput.test(name) == true) {
            req.flash('error', 'Nome do cliente inválido');
            return sendRequestDataClient('name');
        }
    
        // if(lastname == "" || validateInput.test(lastname) == true) {
        //     req.flash('error', 'Sobrenome do cliente inválido');
        //     return sendRequestDataClient('lastname');
        // }
    
        if(email == "" || regexEmail.test(email) == false) {
            req.flash('error', 'E-mail do cliente inválido');
            return sendRequestDataClient('email');
        }
    
        if(phone == "" || phone.length != 14) {
            req.flash('error', 'Telefone do cliente inválido');
            return sendRequestDataClient('phone');
        }
    
        if(cell == "" || cell.length != 16) {
            req.flash('error', 'Celular do cliente inválido');
            return sendRequestDataClient('cell');
        }
    
        if(cep == "" || cep.length != 9) {
            req.flash('error', 'CEP do cliente inválido');
            return sendRequestDataClient('cep');
        }
    
        if(city == "" || validateInput.test(city) == true) {
            req.flash('error', 'Cidade do cliente inválido');
            return sendRequestDataClient('city');
        }
    
        if(district == "" || validateInput2.test(district) == true) {
            req.flash('error', 'Bairro do cliente inválido');
            return sendRequestDataClient('district');
        }
    
        if(address == "" || validateInput2.test(address) == true) {
            req.flash('error', 'Endereço do cliente inválido');
            return sendRequestDataClient('address');
        }
    
        if(number == "" || validateInput2.test(number) == true) {
            req.flash('error', 'Número do cliente inválido');
            return sendRequestDataClient('number');
        }
    
        if(complement == "" || validateInput2.test(complement) == true) {
            req.flash('error', 'Complemento do cliente inválido');
            return sendRequestDataClient('complement');
        }
    
        function sendRequestDataClient(input) {
            return res.render('clients/edit.html', {
                cellphone: cell,
                cep: cep,
                city: city,
                district: district,
                address: address,
                number_address: number,
                complement: complement,
                email: email,
                state: state,
                username: name,
                phone: phone,
                input: input,
                id: id
            });
        }
    
        Client.update({
            cellphone: req.body.cell,
            cep: req.body.cep,
            city: req.body.city,
            district: req.body.district,
            address: req.body.address,
            number_address: req.body.number,
            complement: req.body.complement,
            email: req.body.email,
            state: req.body.state,
            username: req.body.name,
            phone: req.body.phone
        },{
            where: {
                id: id
            }
        }).then(function() {
            req.flash('success', 'Cliente atualizado com sucesso');
            res.redirect('/admin/clients');
        }).catch(function(error) {
            req.flash('error', 'Não foi possível atualizar o cliente com sucesso. Erro: ' + error);
            res.redirect('/admin/clients');
        });
        // res.render('clients/add.html');
    });

        //VIEW
    app.get('/admin/clients/view/:id', isAdmin, (req, res) => {
        var id = req.params.id;
        Client.findOne({
            where: {
                id: id
            }
        }).then((client) => {
            if (!client) {
                res.render('../views/notFound.html');
            } else {
                res.render('../views/clients/view.html', {client: client});
            }
        }).catch((err) => {
            res.render('../views/notFound.html');
        })
    });

        //DELETE
    app.get('/admin/clients/delete/:id', isAdmin, (req, res) => {
        var id = req.params.id;
        Client.destroy({
            where: {
                id: id
            }
        });
        req.flash('success', 'Cliente excluído com sucesso');
        res.redirect("/admin/clients");
    });

    //MACHINES
        //PRINCIPAL - LIST - FILTER
    app.get('/admin/machines', isAdmin, (req, res) => {
        Machine.findAll()
        .then((machines) => {
            res.render('machines/index.html', {machines: machines});
        }).catch((err) => {
            console.log("err: ", err);
        });
    });
    
    app.get('/admin/machines/index', isAdmin, (req, res) => {
        res.redirect('/admin/machines');
    }); 

        //ADD
    app.get('/admin/machines/add', isAdmin, (req, res) => {
        res.render('machines/add.html')
    });
    
    app.post('/admin/machines/add', isAdmin, (req, res) => {
        var machine_name = req.body.machine_name;
        var conservation_state = req.body.conservation_state;
        var validateInput = /[@!#$%^&*()='+_"?°~`<>{}\\]/;
    
        if(machine_name == "" || validateInput.test(machine_name) == true) {
            req.flash('error', 'Nome da maquina inválido');
            return sendRequestDataClient('machine_name');
        }
    
        if(conservation_state == "" || validateInput.test(conservation_state) == true) {
            req.flash('error', 'Estado de conservação inválido');
            return sendRequestDataClient('conservation_state');
        }
    
        function sendRequestDataClient(input) {
            return res.render('machines/add.html', {
                machine_name: machine_name,
                conservation_state: conservation_state,
                input: input,
            });
        }
    
        Machine.create({
            machine_name: machine_name,
            conservation_state: conservation_state,
        }).then(function() {
            req.flash('success', 'Máquina cadastrada com sucesso');
            res.redirect('/admin/machines');
        }).catch(function(error) {
            req.flash('error', 'Não foi possível cadastrar a máquina com sucesso. Erro: ' + error);
            res.redirect('/admin/machines');
        });
    });

        //EDIT
    app.get('/admin/machines/edit/:id', isAdmin, (req, res) => {
        var id = req.params.id;
    
        Machine.findOne({
            where: {
                id: id
            },
    
        }).then((machine) => { 
            res.render('machines/edit.html', {
                machine_name: machine.machine_name,
                conservation_state: machine.conservation_state,
                id: id
            });
        })
    });
    
    app.post('/admin/machines/edit/:id', isAdmin, (req, res) => {
        var id = req.params.id;
    
        var machine_name = req.body.machine_name;
        var conservation_state = req.body.conservation_state;
        var validateInput = /[@!#$%^&*()='+_"?°~`<>{}\\]/;
    
        if(machine_name == "" || validateInput.test(machine_name) == true) {
            req.flash('error', 'Nome da maquina inválido');
            return sendRequestDataClient('machine_name');
        }
    
        if(conservation_state == "" || validateInput.test(conservation_state) == true) {
            req.flash('error', 'Estado de conservação inválido');
            return sendRequestDataClient('conservation_state');
        }
    
        function sendRequestDataClient(input) {
            return res.render('machines/edit.html', {
                machine_name: machine_name,
                conservation_state: conservation_state,
                input: input,
                id: id
            });
        }
    
        Machine.update({
            machine_name: machine_name,
            conservation_state: conservation_state
            }, 
            {
                where: {
                    id: id
            }
        }).then(function() {
            req.flash('success', 'Máquina atualizada com sucesso');
            res.redirect('/admin/machines');
        }).catch(function(error) {
            req.flash('error', 'Não foi possível atualizar a máquina com sucesso. Erro: ' + error);
            res.redirect('/admin/machines');
        });
    });

        //DELETE
    app.get('/admin/machines/delete/:id', isAdmin, (req, res) => {
        var id = req.params.id;
        Machine.destroy({
            where: {
                id: id
            }
        });
        req.flash('success', 'Máquina excluída com sucesso');
        res.redirect("/admin/machines");
    });
    
    //ORDERS
        //PRINCIPAL - LIST - FILTER
    app.get('/admin/orders', isAdmin, (req, res) => {

        //Count how many query strings are in  the url
        var countQuery = 0;
        for (i in req.query) {
            countQuery++;
        }
    
        let {
            order = 'DESC',
            limit = 15,
            page = 1,
            column = 'id',
            id = '',
            service = '',
            clientname = '',
            machinename = '',
            start = '',
            end = ''
        } = req.query;
    
        var conditions = {};
        //Tests if search is disabled
        if(id != '' || service != '' || clientname != '' || machinename != '' || start != '' || end != '') {
            //Search Enabled
            conditions = search.searchOrder(id, service, clientname, machinename, start, end);
            console.log(conditions);
        }
    
        //Tests if column query string have a foreign key
        var query_model = column.split('.');
        var ordenation = [column, order];
    
        if(query_model.length == 2) {
            if(query_model[0] == 'client') {
                ordenation = [Client, query_model[1], order];
            } else if (query_model[0] == 'machine') {
                ordenation = [Machine, query_model[1], order];
            }
        }
    
        limit = parseInt(limit);
        page = parseInt(page - 1);
    
        Order.findAndCountAll({
            include: [Client, Machine],
            order: [
                [ordenation]
            ],
            where: conditions,
            limit: limit,
            offset: page * limit
        }).then(({count: quantity, rows: orders}) => {
    
            //Calc pagination
            //init will ever be 1
            //last depends of quantity and limit
            pages = [];
            last = quantity / limit;
            last = Math.ceil(last);
    
            if(page + 1 <= 3) {
                if(last < 5) {
                    if(last == 4) {
                        pages = [1, 2, 3, 4]
                    } else if(last == 3) {
                        pages = [1, 2, 3]
                    } else if (last == 2) {
                        pages = [1, 2]
                    } else {
                        pages = [1]
                    }
                } else {
                    pages = [1, 2, 3, 4, 5];
                } 
            } else if ((last - (page + 1)) < 2) {  
                if(last < 5) {
                    if(last == 4) {
                        pages = [last - 3, last - 2, last - 1, last]
                    } else if(last == 3) {
                        pages = [last - 2, last - 1, last]
                    } else if (last == 2) {
                        pages = [last - 1, last]
                    } else {
                        pages = [last];
                    }
                } else {
                    pages = [last -4, last - 3, last - 2, last - 1, last];
                }    
            } else {
                pages = [page - 1, page, page + 1, page + 2, page + 3];
            }
            
            Client.findAll().then((clients) => {
                Machine.findAll().then((machines) => {
                    res.render('orders/index.html', 
                    {
                        orders: orders,
                        clients: clients,
                        machines: machines,
                        offset: (page * limit) + 1,
                        count: countQuery,
                        order: order,
                        queries: req.query,
                        pages: pages,
                        last: last
                    });
                }).catch((err) => {
                    res.render('../views/notFound.html');
                    console.log("err: ", err);
                });
            }).catch((err) => {
                res.render('../views/notFound.html');
                console.log("err: ", err);
            });
            
        }).catch((err) => {
            console.log("err: ", err);
        });
    }); 
    
    app.get('/admin/orders/index', isAdmin, (req, res) => {
        res.redirect('/orders');
    });

        //ADD
    app.get('/admin/orders/add', isAdmin, (req, res) => {
        Client.findAll().then((clients) => {
            Machine.findAll().then((machines) => {
                res.render('orders/add.html', {clients: clients, machines: machines});
            }).catch((err) => {
                console.log('err: ' + err);
            })
        }).catch((err) => {
            console.log('err: ' + err);
        });
    }); 

    app.post('/admin/orders/add', isAdmin, (req, res) => {
    
        Client.findAll().then((clients) => {
            Machine.findAll().then((machines) => {
                var clientName = req.body.clientName;
                var serviceType = req.body.servicetype;
                var machineType = req.body.machinetype;
                var orderDescription = req.body.orderdescription;

                Client.findOne({where:{id: clientName}}).then((client) => {
                    Machine.findOne({where:{id: machineType}}).then((machine) => {
                        var validateInput = /[@!#$%^&*()='+_"?°~`<>{}\\]/;
    
                        if(clientName == "0") {
                            req.flash('error', 'Cliente Inválido!');
                            return sendRequestData('clientName');
                        }
    
                        if(serviceType == "" || validateInput.test(serviceType) == true) {
                            req.flash('error', 'Nome do serviço inválido!');
                            return sendRequestData('serviceType');
                        }
    
                        if(machineType == "0" || validateInput.test(machineType) == true) {
                            req.flash('error', 'Nome da máquina inválida!');
                            return sendRequestData('machineType');
                        }
    
                        if(orderDescription == "" || validateInput.test(orderDescription) == true) {
                            req.flash('error', 'Descrição do pedido inválida!');
                            return sendRequestData('orderDescription');
                        }
    
                        function sendRequestData(input) {
                            var attributes = {
                                clientid: clientName,
                                service: serviceType,
                                machineid: machineType,
                                order: orderDescription,
                                input: input,
                                clients: clients,
                                machines: machines,
                            };

                            if(client) {
                                attributes = Object.assign(attributes, {name: client.username});
                            }

                            if(machine) {
                                attributes = Object.assign(attributes, {mname: machine.machine_name});
                            }
                            
                            return res.render('orders/add.html', attributes);
                        }
                        
                        Order.create({
                            clientId: clientName,
                            service_type: serviceType,
                            machineId: machineType,
                            service_description: orderDescription
                        }).then(function() {
                            req.flash('success', 'Pedido cadastrado com sucesso');
                            res.redirect('/admin/orders');
                        }).catch(function(error) {
                            req.flash('error', 'Não foi possível cadastrar com sucesso. Erro: ' + error);
                            res.redirect('/admin/orders');
                        });
                    }).catch((err) => {
                        console.log('err: ' + err);
                    });
                }).catch((err) => {
                    console.log('err: ' + err);
                });
            }).catch((err) => {
                console.log('err: ' + err);
            });
        }).catch((err) => {
            console.log('err: ' + err);
        });
    });
    
        //EDIT
    app.get('/admin/orders/edit/:id', isAdmin, (req, res) => {
        var id = req.params.id;
    
        Order.findOne({
            where: {
                id: id
            },
            include: [Client, Machine]
    
        }).then((order) => {
            Client.findAll().then((clients) => {
                Machine.findAll().then((machines) => {
                    res.render('orders/edit.html', {
                        service: order.service_type,
                        order: order.service_description,
                        clientid: order.clientId,
                        name: order.client.username,
                        clients: clients,
                        machines: machines,
                        machineid: order.machineId,
                        mname: order.machine.machine_name,
                        id: id
                    });
                })
            })
        })
    
    });

    app.post('/admin/orders/edit/:id', isAdmin, (req, res) => {
        var id = req.params.id;
        Client.findAll().then((clients) => {
            Machine.findAll().then((machines) => {
                var clientName = req.body.clientName;
                var serviceType = req.body.servicetype;
                var machineType = req.body.machinetype;
                var orderDescription = req.body.orderdescription;
    
                Client.findOne({where:{id: clientName}}).then((client) => {
                    Machine.findOne({where:{id: machineType}}).then((machine) => {
                        var validateInput = /[@!#$%^&*()='+_"?°~`<>{}\\]/;
    
                        if(clientName == "0") {
                            req.flash('error', 'Cliente Inválido!');
                            return sendRequestData('clientName');
                        }
    
                        if(serviceType == "" || validateInput.test(serviceType) == true) {
                            req.flash('error', 'Nome do serviço inválido!');
                            return sendRequestData('serviceType');
                        }
    
                        if(machineType == "0" || validateInput.test(machineType) == true) {
                            req.flash('error', 'Nome da máquina inválida!');
                            return sendRequestData('machineType');
                        }
    
                        if(orderDescription == "" || validateInput.test(orderDescription) == true) {
                            req.flash('error', 'Descrição do pedido inválida!');
                            return sendRequestData('orderDescription');
                        }
    
                        function sendRequestData(input) {
                            return res.render('orders/edit.html', {
                                clientid: clientName,
                                service: serviceType,
                                machineid: machineType,
                                order: orderDescription,
                                input: input,
                                clients: clients,
                                machines: machines,
                                name: client.username,
                                mname: machine.machine_name,
                                id: id
                            });
                        }
                        
                        Order.update({
                            clientId: clientName,
                            service_type: serviceType,
                            machineId: machineType,
                            service_description: orderDescription
                        }, {
                            where: {
                                id: id
                            }
                        }).then(function() {
                            req.flash('success', 'Pedido atualizado com sucesso');
                            res.redirect('/orders');
                        }).catch(function(error) {
                            req.flash('error', 'Não foi possível atualizar com sucesso. Erro: ' + error);
                            res.redirect('/orders');
                        });
                    }).catch((err) => {
                        console.log('err: ' + err);
                    });
                }).catch((err) => {
                    console.log('err: ' + err);
                });
            }).catch((err) => {
                console.log('err: ' + err);
            });
        }).catch((err) => {
            console.log('err: ' + err);
        });
    });

        //VIEW
    app.get('/admin/orders/view/:id', isAdmin, (req, res) => {
        var id = req.params.id;
        Order.findOne({
            where: {
                id: id
            },
            include: [Client, Machine]
        }).then((order) => {
            if (!order) {
                res.render('../views/notFound.html');
            } else {
                res.render('../views/orders/view.html', {order: order});
            }
        }).catch((err) => {
            res.render('../views/notFound.html');
        })
    });

        //DELETE
    app.get('/admin/orders/delete/:id', isAdmin, (req, res) => {
        var id = req.params.id;
        Order.destroy({
            where: {
                id: id
            }
        });
        req.flash('success', 'Pedido excluído com sucesso');
        res.redirect("/admin/orders");
    });
}