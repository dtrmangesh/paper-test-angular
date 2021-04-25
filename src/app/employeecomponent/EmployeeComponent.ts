import { Component, OnInit } from '@angular/core';
import { EmployeeData, InputEvents } from '../app.interface';
import * as candidateData from '../mockdata.json';

@Component({
  selector: 'employee-component',
  templateUrl: './EmployeeComponent.html',
  styleUrls: ['./EmployeeComponent.scss'],
})
export class EmployeeComponent implements OnInit {
  employeeData: EmployeeData[];
  sortByNames = false;
  sortByDates = false;
  departmentCount = [];
  departmentEvent = false;
  constructor() {}

  ngOnInit(): void {
    this.employeeData = candidateData.data;
  }

  searchEmployee($event: InputEvents) {
    this.employeeData = candidateData.data.filter((employee: EmployeeData) => {
      return employee.name
        .toLocaleLowerCase()
        .includes(`${$event.target.value.toLocaleLowerCase()}`);
    });
  }

  sortByName(): void {
    this.sortByNames = !this.sortByNames;
    this.employeeData = this.employeeData.sort(
      (a: EmployeeData, b: EmployeeData) => {
        if (this.sortByNames) {
          if (a.name < b.name) {
            return -1;
          }
        } else {
          if (a.name > b.name) {
            return -1;
          }
        }
      }
    );
  }

  sortByDate(): void {
    this.sortByDates = !this.sortByDates;
    if (this.sortByDates) {
      this.employeeData = this.employeeData.sort(
        (a: EmployeeData, b: EmployeeData) => {
          const date1 = a.joining_date.toString().split('/');
          const date2 = b.joining_date.toString().split('/');
          let day1 = parseInt(date1[0]);
          let day2 = parseInt(date2[0]);
          let month1 = parseInt(date1[1]);
          let month2 = parseInt(date2[1]);
          let year1 = parseInt(date1[2]);
          let year2 = parseInt(date2[2]);
          if (year1 !== year2) {
            return year1 - year2;
          } else if (month1 !== month2) {
            return month1 - month2;
          } else {
            return day1 - day2;
          }
        }
      );
    } else {
      this.employeeData = this.employeeData.reverse();
    }
  }

  filterByExperience($event: InputEvents): void {
    if ($event.target.checked) {
      const pastYear = new Date().getFullYear() - 2;
      let expreinceYear =
        new Date().getDate() + '/' + new Date().getMonth() + '/' + pastYear;
      expreinceYear = expreinceYear.toString().split('/').reverse().join();
      this.employeeData = this.employeeData.filter((employee: EmployeeData) => {
        const joiningDate = employee.joining_date
          .toString()
          .split('/')
          .reverse()
          .join();
        return joiningDate < expreinceYear;
      });
    } else {
      this.employeeData = candidateData.data;
    }
  }

  filterByDepartment($event: InputEvents): void {
    this.departmentCount = [];
    this.departmentEvent = $event.target.checked;
    if ($event.target.checked) {
      var departmentCount = {};
      for (var i = 0; i < this.employeeData.length; i++) {
        if (this.employeeData[i].department in departmentCount) {
          departmentCount[this.employeeData[i].department] += 1;
        } else {
          departmentCount[this.employeeData[i].department] = 1;
        }
      }
      this.departmentCount.push(departmentCount);
    } else {
      console.log(this.departmentCount);
      this.departmentCount = [];
    }
  }

  removeCandidates() {
    this.employeeData = this.employeeData.filter((candidate: EmployeeData) => {
      return candidate.department !== 'Development';
    });
    if (this.departmentEvent) {
      this.filterByDepartment({ target: { checked: true } });
    }
  }
}
