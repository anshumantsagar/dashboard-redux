import React, { Component } from 'react';
import Modal from 'react-modal';


//css
import classes from './App.module.css'

//components
import Navbar from './components/Navbar/Navbar';
import Analytics from './components/Analytics/Analytics';
import Table from './components/Table/Table';
import ListContext from './context/listContext';
Modal.setAppElement('#root')

class App extends Component {
  state = {
    isModalOpen : false,
    name: '',
    gender: '',
    age: '',
    designation:'',
    department:'',
    joiningDate:'',
    employeeList: [],
    editMode: false,
    index: null,
    avilable: 0,
    validation: false
  }

  addEditEmployee = () => {
    this.setState({validation:true})
    let newEmployeeList = this.state.employeeList;
    if ( this.checkValidation() === true ) {
      if( this.state.editMode ) {
        const data = {
          id: this.state.employeeList[this.state.index].id,
          name: this.state.name,
          gender: this.state.gender,
          age: this.state.age,
          designation: this.state.designation,
          department: this.state.department,
          joiningDate: this.state.joiningDate,
          avilable: this.state.employeeList[this.state.index].avilable
        };
        newEmployeeList.splice(this.state.index,1,data);
        this.setState({
          editMode:false,
          index:null
        })
      } else {
        const data = {
          id:Date.now(),
          name: this.state.name,
          gender: this.state.gender,
          age: this.state.age,
          designation: this.state.designation,
          department: this.state.department,
          joiningDate: this.state.joiningDate,
          avilable: true
        };
        newEmployeeList.push(data);
      }
      this.setState({
        employeeList:newEmployeeList,
        isModalOpen:false,
        validation:false});
      this.cancel();
      this.checkAvilable();
    }
  }

  makeEditReady = (newIndex) => {
    this.setState({
      editMode:true,
      isModalOpen:true,
      index:newIndex});
    this.editEmployee(newIndex);
  }

  editEmployee = (key) => {
    this.setState({isModalOpen:true})
    let person = this.state.employeeList[key];
    this.setState({
      name: person.name,
      gender: person.gender,
      age: person.age,
      designation: person.designation,
      department: person.department,
      joiningDate: person.joiningDate
    });
  }

  deleteEmployee = (key) => {
    let newList = this.state.employeeList
    newList.splice(key,1);
    this.setState({employeeList:newList});
    this.checkAvilable();
  }

  cancel = () => {
    this.setState({
      name: '',
      gender: '',
      age: '',
      designation: '',
      department: '',
      joiningDate: '',
      isModalOpen:false,
      validation: false
    })
  }

  changeAvailability = (index) => {
    let newList = this.state.employeeList;
    newList[index].avilable = !newList[index].avilable;
    this.setState({employeeList:newList});
    this.checkAvilable();
  }

  checkAvilable = () => {
    let newAvilable = 0;
    if( this.state.employeeList.length > 0 ) {
      newAvilable = 0;
      for ( let elem of this.state.employeeList ) {
        if( elem.avilable ) {
          newAvilable ++;
        }
      }
    }
    this.setState({avilable:newAvilable});
  }

  checkValidation = () => {
    if ( 
      this.state.name !== '' &&
      this.state.gender !== '' &&
      this.state.age !== '' &&
      this.state.designation !== '' &&
      this.state.department !== '' &&
      this.state.joiningDate !== '' 
    ) {
      return true
    }
  }

  render () {
    return (
      <div className="App">
        <ListContext.Provider value={{
            list: this.state.employeeList,
            edit: this.editEmployee,
            changeAvailable: this.changeAvailability,
            delete: this.deleteEmployee
            }}>
          <Navbar/>
          <Analytics 
            addEmployee={() =>this.setState({isModalOpen:true})} 
            total={this.state.employeeList.length}
            avilable={this.state.avilable}/>
          <Table 
            onEdit={() =>this.setState({isModalOpen:true})}
            list={this.state.employeeList}/>
           <Modal
            isOpen={this.state.isModalOpen} 
            onRequestClose={() =>this.setState({isModalOpen:false})}
            // style={{
            //   overlay: {
            //     backgroundColor: 'grey'
            //   }
            // }}
            >
              <div className={classes.Form}>
                  <section>Add Employee </section>
                  <section>
                      <span>
                          <label>Name</label>
                          <input 
                            placeholder="Enter" 
                            // onChange={(event) => {
                            //   this.setState((prevState) => {
                            //     prevState.addEmployeeData.name = event.target.value;
                            //     return prevState;
                            //   })
                            // }}
                            onChange={event => this.setState({name:event.target.value})}
                            value={this.state.name}
                          />
                      </span>
                      <span>
                          <label>Gender</label>
                          <select 
                            onChange={event => this.setState({gender:event.target.value})}
                            value={this.state.gender}>
                              <option>Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                          </select>
                      </span>
                  </section>
                  <section>
                      <span>
                          <label>Age</label>
                          <input 
                            placeholder="Enter"
                            onChange={event => this.setState({age:event.target.value})}
                            value={this.state.age}/>
                      </span>
                      <span>
                          <label>Designation</label>
                          <input 
                            placeholder="Enter"
                            onChange={event => this.setState({designation:event.target.value})}
                            value={this.state.designation}/>
                      </span>
                  </section>
                  <section>
                      <span>
                          <label>Department</label>
                          <input 
                            placeholder="Enter"
                            onChange={event => this.setState({department:event.target.value})}
                            value={this.state.department}/>
                      </span>
                      <span>
                          <label>Joining Date</label>
                          <input 
                            type="date" 
                            onChange={event => this.setState({joiningDate:event.target.value})}
                            value={this.state.joiningDate}/>
                      </span>
                  </section>
                  <section>
                      <span style={{display:'flex',flexDirection:'row'}}>
                          <button className={classes.CanceButton} onClick={this.cancel}>Cancel</button>
                          <button className={classes.SaveButton} onClick={this.addEditEmployee}>Save</button>
                      </span>
                  </section>
              </div>
              {this.state.validation ? <div style={{color:'red',display:'flex',flexDirection:'column',alignItems:'center'}}>Enter Valid Data</div> : null}
          </Modal>
        </ListContext.Provider>
      </div>
    );
  }
  
  
}

export default App;