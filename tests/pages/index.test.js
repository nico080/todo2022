import React from "react";
// Using render and screen from test-utils.js instead of
// @testing-library/react
import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";
import Headers from "../../components/Header";

describe("Headers", () => {
   
    it("should render the Todo Title", () => {
     
        render(<Headers />);
  
      const Content = screen.getByText(
        /List your task/i, /To/i, /do/i
      );
      expect(Content).toBeInTheDocument();
    });
    });

describe("Task List", () => {
    let data ={ "totalNum": 3,
    "totalPages": 1,
    "tasks": [
        {
            "_id": "632751259719bf8d2d3de9ae",
            "task": "TAKE THE BOTTLE",
            "done": false,
            "__v": 0
        },
        {
            "_id": "632751189719bf8d2d3de9aa",
            "task": "GET ALL SUPPLIES",
            "done": false,
            "__v": 0
        },
        {
            "_id": "632751079719bf8d2d3de9a7",
            "task": "STUDY ABOOUT LUCID DREAM",
            "done": false,
            "__v": 0
        }]}


    it("should render the input field of task", () => {
     
        render(<Home taskItems= { data } />);
  
      expect(screen.getByPlaceholderText('Add Task')).toBeInTheDocument();
    });


    it("should render the Task List with Samples", () => {
     
        render(<Home taskItems= { data } />);
  
      const taskContent = screen.getByText(
        /GET ALL SUPPLIES/i, /STUDY ABOOUT LUCID DREAM/i, /TAKE THE BOTTLE/i
      );
      expect(taskContent).toBeInTheDocument();
    });

    it("should render the Task List with option/button to delete & mark as done or undone", () => {
     
        const { container } =   render(<Home taskItems= { data } />);
        expect(container.getElementsByClassName('svg-inline--fa').length).toBeGreaterThan(1);
    });

    it("should render the Task List filter buttons", () => {
     
        render(<Home taskItems= { data } />);
  
     const actionButtons =  screen.getByRole('button', {
        name: /In Progress/i, name: /All/i, name: /Done/i,
        name: /Remove Completed/i
      })

      expect(actionButtons).toBeInTheDocument();
    });

    it("should render the Task List pagination", () => {
     
        const { container } =   render(<Home taskItems= { data } />);
        expect(container.getElementsByClassName('MuiPagination-root').length).toBe(1);
    });
  });