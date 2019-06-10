import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import styles from "./styles.module.scss";
import Ticket from "../../components/Ticket";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import ErrorPage from "../../components/ErrorPage";
import ViewTicket from "../ViewTicket";
import { constant } from "../../constant/";
import { endpoint, makePaginationEndPoint } from "../../ultils/EndPoints";
import axios from "axios";
import { Route } from "react-router-dom";
export default class Tickets extends Component {
  state = {
    ticketsEndPoint: endpoint.tickets.getPaginateTickets,
    isLoading: false,
    count: 0,
    page: 1,
    isOpenTicket: false,
    tickets: [],
    isError: false
  };
  componentDidMount() {
    let { ticketsEndPoint } = this.state;
    let page = this.state.page;
    this.getTicket(ticketsEndPoint, page);
  }

  getTicket = (endpoint, page) => {
    let { per_page } = constant.pagination;
    endpoint = makePaginationEndPoint(endpoint, per_page, page);

    this.setState({ isLoading: true });
    axios
      .get(endpoint)
      .then(res => {
        let { tickets, count } = res.data;
        this.setState({ isLoading: false });
        this.setState({
          count,
          tickets
        });
        ToastsStore.success("Load all tickets success");
      })
      .catch(err => {
        this.setState({
          isError: true,
          isLoading: false
        });
        if (err.response.status === 500) {
          ToastsStore.error(err.response.statusText);
        } else ToastsStore.error(err.response.data.error.msg);
        console.log(err.response);
      });
  };
  handleChangePage = page => {
    this.setState({ page, tickets: [] });
    this.getTicket(this.state.ticketsEndPoint, page);
  };
  handleOpenTicket = () => {
    this.setState({ isOpenTicket: true });
  };
  handleCloseTicket = () => {
    this.setState({ isOpenTicket: false });
  };
  render() {
    const { tickets, count, page, isError } = this.state;
    return (
      <div className={styles.tickets}>
        <Spinner isShow={this.state.isLoading} />
        <ToastsContainer store={ToastsStore} />
        <h3>View tickets</h3>
        {isError ? <ErrorPage /> : null}
        <div className={styles.ticket}>
          {tickets &&
            tickets.map(ticket => (
              <Ticket
                key={ticket.id}
                ticket={ticket}
                openTicket={this.handleOpenTicket}
              />
            ))}
        </div>
        <Route
          exact
          path="/tickets/:id"
          render={props => (
            <ViewTicket
              isOpen={this.state.isOpenTicket}
              closeTicket={this.handleCloseTicket}
              {...props}
            />
          )}
        />
        <Pagination
          count={count}
          per_page={constant.pagination.per_page}
          page={page}
          handleChange={this.handleChangePage}
        />
      </div>
    );
  }
}
