/**
 *
 * HomePage
 *
 */

import React, { Component } from "react";

import { DivBlock, Button, List, ListItem } from "../modules/Basic";
import {
  Messages,
  Spinner,
  Tabs,
  TabList,
  Tab,
  TabPanel
} from "../modules/Components";
import { If, Then, Else } from "../modules/Logic";
import { Span, Heading, TextLink, Paragraph } from "../modules/Typography";
import { Grid, Row, Col, Placeholder } from "../modules/Layout";
import {
  FormBlock,
  TextInput,
  SubmitButton,
  SelectDropDown,
  SelectOption
} from "../modules/Forms";

import KAI from '../images/KAI.png';
import KAIcost from '../images/KAIcost.png';
import molecules from '../images/molecules.jpg';
import pcr from '../images/pcr.jpg';
import pizza from '../images/pizza.jpg';
import penguin from '../images/penguin.jpg';
import thumbsdown from '../images/thumbsdown.jpg';
import thumbsup from '../images/thumbsup.jpg';
import time_acadamy_logo from '../images/time_acadamy_logo.png';
import time_acadamy from '../images/timeAcademy.jpg';
import under from '../images/under.png';
import white from '../images/white.PNG';

class HomePage extends Component {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>

        <DivBlock actions={[{ action: "Get Current User", trigger: "onload" }]}>
          <Messages />
          <Spinner />
          <If condition="'{{show_app}}' === 'true'" actions={[]}>
            <Then>
              <DivBlock>
                <Tabs name="main" className="main">
                  <TabList
                    style={{ listStyle: "none", margin: "0px", padding: "0px" }}
                    className="d-flex list-group-horizontal"
                    position="top"
                  >
                    <Tab style={{ padding: "5px" }}>
                      <img
                        src={time_acadamy_logo}
                        style={{ height: "38px" }}
                      />
                    </Tab>
                    <Tab
                      className="list-group-item"
                      style={{ display: "block" }}
                    >
                      <Span>Explore</Span>
                    </Tab>
                    <Tab className="list-group-item"><Span>Create</Span></Tab>
                    <img
                      src={KAI}
                      style={{
                        height: "48px",
                        position: "static",
                        float: "none"
                      }}
                    />
                    <Tab />
                  </TabList>
                  <TabPanel>
                    <DivBlock className="card m-2">
                      <DivBlock className="card-body">
                        <Grid fluid={true}>
                          <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                              <Heading
                                type="h2"
                                style={{
                                  fontFamily: "Palatino Linotype",
                                  textDecoration: "none",
                                  fontWeight: "700"
                                }}
                              >
                                This might tickle your brain
                              </Heading>
                            </Col>
                          </Row>
                          <Row
                            center="xs"
                            top="xs"
                            style={{ display: "flex", alignItems: "stretch" }}
                          >
                            <Col xs={12} sm={12} md={3} lg={3}>
                              <DivBlock
                                style={{
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column"
                                }}
                              >
                                <img
                                  src={pizza}
                                  style={{
                                    width: "100%",
                                    display: "block",
                                    paddingLeft: "auto",
                                    borderStyle: "solid",
                                    borderTopStyle: "solid",
                                    borderLeftStyle: "solid",
                                    borderRightStyle: "solid",
                                    borderBottomStyle: "solid",
                                    borderTopColor: "#000000",
                                    borderLeftColor: "#000000",
                                    borderRightColor: "#000000",
                                    borderBottomColor: "#000000"
                                  }}
                                />
                                <span
                                  style={{
                                    display: "flex",
                                    backgroundColor: "#70ad07",
                                    color: "#ffffff",
                                    borderTopStyle: "solid",
                                    borderLeftStyle: "solid",
                                    borderRightStyle: "solid",
                                    borderBottomStyle: "solid",
                                    borderTopColor: "#000000",
                                    borderLeftColor: "#000000",
                                    borderRightColor: "#000000",
                                    borderBottomColor: "#000000",
                                    borderStyle: "solid"
                                  }}
                                >
                                  &nbsp;Level 1
                                </span>
                                <DivBlock
                                  className="flex-grow-1 p-1"
                                  style={{
                                    borderLeftStyle: "solid",
                                    borderRightStyle: "solid",
                                    borderBottomStyle: "solid"
                                  }}
                                >
                                  <span
                                    style={{
                                      textAlign: "left",
                                      display: "flex",
                                      fontStyle: "normal",
                                      fontFamily: "Palatino Linotype"
                                    }}
                                  >
                                    Homemade Eco-Friendly Pizza
                                  </span>
                                  <span
                                    style={{
                                      textAlign: "left",
                                      display: "flex",
                                      fontStyle: "italic",
                                      fontFamily: "Palatino Linotype"
                                    }}
                                  >
                                    with locally sourced ingredients
                                  </span>
                                </DivBlock>
                              </DivBlock>
                            </Col>
                            <Col xs={12} sm={12} md={3} lg={3}>
                              <DivBlock
                                style={{
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column"
                                }}
                              >
                                <img
                                  src={pcr}
                                  style={{
                                    width: "100%",
                                    borderStyle: "solid",
                                    borderTopStyle: "solid",
                                    borderLeftStyle: "solid",
                                    borderRightStyle: "solid",
                                    borderBottomStyle: "solid",
                                    borderTopColor: "#000000",
                                    borderLeftColor: "#000000",
                                    borderRightColor: "#000000",
                                    borderBottomColor: "#000000"
                                  }}
                                />
                                <DivBlock>
                                  <span
                                    style={{
                                      display: "flex",
                                      color: "#ffffff",
                                      backgroundColor: "#70ad07",
                                      borderStyle: "solid",
                                      borderTopStyle: "solid",
                                      borderLeftStyle: "solid",
                                      borderRightStyle: "solid",
                                      borderBottomStyle: "solid",
                                      borderTopColor: "#000000",
                                      borderLeftColor: "#000000",
                                      borderRightColor: "#000000",
                                      borderBottomColor: "#000000"
                                    }}
                                  >
                                    &nbsp;Level 7
                                  </span>
                                </DivBlock>
                                <DivBlock
                                  className="flex-grow-1 p-1"
                                  style={{
                                    borderLeftStyle: "solid",
                                    borderBottomStyle: "solid",
                                    borderRightStyle: "solid"
                                  }}
                                >
                                  <span
                                    style={{
                                      textAlign: "left",
                                      display: "flex",
                                      fontStyle: "normal",
                                      fontFamily: "Palatino Linotype"
                                    }}
                                  >
                                    Improving PCR specificity
                                  </span>
                                  <span
                                    style={{
                                      textAlign: "left",
                                      display: "flex",
                                      fontStyle: "italic",
                                      fontFamily: "Palatino Linotype"
                                    }}
                                  >
                                    decreasing false positives and negatives
                                  </span>
                                </DivBlock>
                              </DivBlock>
                            </Col>
                            <Col xs={12} sm={12} md={3} lg={3}>
                              <DivBlock
                                style={{
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column"
                                }}
                              >
                                <img
                                  src={molecules}
                                  style={{
                                    width: "100%",
                                    borderStyle: "solid",
                                    borderTopStyle: "solid",
                                    borderLeftStyle: "solid",
                                    borderRightStyle: "solid",
                                    borderBottomStyle: "solid",
                                    borderTopColor: "#000000",
                                    borderLeftColor: "#000000",
                                    borderRightColor: "#000000",
                                    borderBottomColor: "#000000"
                                  }}
                                />
                                <DivBlock>
                                  <span
                                    style={{
                                      display: "flex",
                                      color: "#ffffff",
                                      backgroundColor: "#70ad07",
                                      borderStyle: "solid",
                                      borderTopStyle: "solid",
                                      borderLeftStyle: "solid",
                                      borderRightStyle: "solid",
                                      borderBottomStyle: "solid",
                                      borderTopColor: "#000000",
                                      borderLeftColor: "#000000",
                                      borderRightColor: "#000000",
                                      borderBottomColor: "#000000"
                                    }}
                                  >
                                    &nbsp;Level 3
                                  </span>
                                </DivBlock>
                                <DivBlock
                                  className="flex-grow-1 p-1"
                                  style={{
                                    borderLeftStyle: "solid",
                                    borderBottomStyle: "solid",
                                    borderRightStyle: "solid"
                                  }}
                                >
                                  <span
                                    style={{
                                      textAlign: "left",
                                      display: "flex",
                                      fontStyle: "normal",
                                      fontFamily: "Palatino Linotype"
                                    }}
                                  >
                                    Using 3D atoms to build your molecules
                                  </span>
                                  <span
                                    style={{
                                      textAlign: "left",
                                      display: "flex",
                                      fontStyle: "italic",
                                      fontFamily: "Palatino Linotype"
                                    }}
                                  >
                                    Build and experiment with covalent bonds
                                  </span>
                                </DivBlock>
                              </DivBlock>
                            </Col>
                            <Col xs={12} sm={12} md={3} lg={3}>
                              <DivBlock
                                style={{
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column"
                                }}
                              >
                                <img
                                  src={penguin}
                                  style={{
                                    width: "100%",
                                    borderStyle: "solid",
                                    borderTopStyle: "solid",
                                    borderLeftStyle: "solid",
                                    borderRightStyle: "solid",
                                    borderBottomStyle: "solid",
                                    borderTopColor: "#000000",
                                    borderLeftColor: "#000000",
                                    borderRightColor: "#000000",
                                    borderBottomColor: "#000000"
                                  }}
                                />
                                <DivBlock>
                                  <span
                                    style={{
                                      display: "flex",
                                      color: "#ffffff",
                                      backgroundColor: "#70ad07",
                                      borderStyle: "solid",
                                      borderTopStyle: "solid",
                                      borderLeftStyle: "solid",
                                      borderRightStyle: "solid",
                                      borderBottomStyle: "solid",
                                      borderTopColor: "#000000",
                                      borderLeftColor: "#000000",
                                      borderRightColor: "#000000",
                                      borderBottomColor: "#000000"
                                    }}
                                  >
                                    &nbsp;Level 2
                                  </span>
                                </DivBlock>
                                <DivBlock
                                  className="flex-grow-1 p-1"
                                  style={{
                                    borderLeftStyle: "solid",
                                    borderBottomStyle: "solid",
                                    borderRightStyle: "solid"
                                  }}
                                >
                                  <span
                                    style={{
                                      textAlign: "left",
                                      display: "flex",
                                      fontStyle: "normal",
                                      fontFamily: "Palatino Linotype"
                                    }}
                                  >
                                    Using 3D atoms to build your molecules
                                  </span>
                                  <span
                                    style={{
                                      textAlign: "left",
                                      display: "flex",
                                      fontStyle: "italic",
                                      fontFamily: "Palatino Linotype"
                                    }}
                                  >
                                    From sea to snow. Why Penguins are tough
                                  </span>
                                </DivBlock>
                              </DivBlock>
                            </Col>
                          </Row>
                        </Grid>
                        <Grid fluid={true}>
                          <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                              <Heading
                                type="h2"
                                style={{
                                  fontFamily: "Palatino Linotype",
                                  textDecoration: "none",
                                  fontWeight: "700",
                                  marginTop: "1rem"
                                }}
                              >
                                Continue your journey
                              </Heading>
                            </Col>
                          </Row>
                          <Row
                            center="xs"
                            top="xs"
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "flex-start"
                            }}
                          >
                            <Col xs={12} sm={12} md={3} lg={3}>
                              <TextLink href="./form.html">
                                <DivBlock
                                  style={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column"
                                  }}
                                >
                                  <img
                                    src={time_acadamy}
                                    style={{
                                      width: "100%",
                                      display: "block",
                                      paddingLeft: "auto",
                                      borderStyle: "solid",
                                      borderTopStyle: "solid",
                                      borderLeftStyle: "solid",
                                      borderRightStyle: "solid",
                                      borderBottomStyle: "solid",
                                      borderTopColor: "#000000",
                                      borderLeftColor: "#000000",
                                      borderRightColor: "#000000",
                                      borderBottomColor: "#000000"
                                    }}
                                  />
                                  <DivBlock
                                    className="flex-grow-1 p-1"
                                    style={{
                                      borderLeftStyle: "solid",
                                      borderRightStyle: "solid",
                                      borderBottomStyle: "solid"
                                    }}
                                  >
                                    <span
                                      style={{
                                        textAlign: "left",
                                        display: "flex",
                                        fontStyle: "normal",
                                        fontFamily: "Palatino Linotype",
                                        borderColor: "#7ed321",
                                        borderTopColor: "#7ed321",
                                        borderLeftColor: "#7ed321",
                                        borderRightColor: "#7ed321",
                                        borderBottomColor: "#7ed321",
                                        borderTopStyle: "none",
                                        borderLeftStyle: "none",
                                        borderRightStyle: "none",
                                        borderBottomStyle: "none"
                                      }}
                                    >
                                      Getting started with Time&nbsp;Academy
                                    </span>
                                    <img
                                      src={under}
                                      style={{ width: "100%" }}
                                    />
                                  </DivBlock>
                                </DivBlock>
                              </TextLink>
                            </Col>
                          </Row>
                        </Grid>
                      </DivBlock>
                    </DivBlock>
                  </TabPanel>
                  <TabPanel className="pt-3">
                    <DivBlock>
                      <DivBlock>
                        <Heading type="h1">Choose your journey</Heading>
                        <Grid
                          fluid={true}
                          style={{
                            display: "flex",
                            flexWrap: "no-wrap",
                            alignContent: "flex-start",
                            flexDirection: "row"
                          }}
                        >
                          <Row
                            center="xs"
                            style={{
                              height: "150px",
                              display: "flex",
                              flexDirection: "row"
                            }}
                            top="xs"
                          >
                            <Col xs={12} sm={12} md={4} lg={4}>
                              <FormBlock
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "stretch"
                                }}
                              >
                                <TextInput
                                  isRequired={true}
                                  name="email"
                                  placeholder="Enter Your Email"
                                />
                                <SubmitButton>Submit</SubmitButton>
                              </FormBlock>
                            </Col>
                            <Col xs={12} sm={12} md={2} lg={2}>
                              <SelectDropDown isRequired={false} options={[]}>
                                <SelectOption
                                  value={1}
                                  label="Select Option 1"
                                />
                              </SelectDropDown>
                            </Col>
                            <Col xs={12} sm={12} md={2} lg={2}>
                              <SelectDropDown isRequired={false} options={[]}>
                                <SelectOption
                                  value={1}
                                  label="Select Option 1"
                                />
                              </SelectDropDown>
                            </Col>
                            <Col xs={3} sm={3} md={2} lg={3}>
                              <SelectDropDown isRequired={false} options={[]}>
                                <SelectOption
                                  value={1}
                                  label="Select Option 1"
                                />
                              </SelectDropDown>
                            </Col>
                          </Row>
                        </Grid>
                      </DivBlock>
                      <Tabs name="main-home">
                        <TabList
                          style={{
                            listStyle: "none",
                            margin: "0px",
                            padding: "0px"
                          }}
                          className="d-flex list-group-horizontal border-top"
                          position="top"
                        >
                          <Tab className="list-group-item">
                            <Span>All</Span>
                          </Tab>
                          <Tab className="list-group-item">
                            <Span>Projects</Span>
                          </Tab>
                          <Tab className="list-group-item">
                            <Span>Mentors</Span>
                          </Tab>
                          <Tab className="list-group-item">
                            <Span>Courses</Span>
                          </Tab>
                          <Tab className="list-group-item">
                            <Span>Skill Paths</Span>
                          </Tab>
                          <Tab className="list-group-item">
                            <Span>Books</Span>
                          </Tab>
                        </TabList>
                        <TabPanel className="pt-3">
                          <DivBlock>
                            <Grid fluid={true}>
                              <Row
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  justifyContent: "center"
                                }}
                              >
                                <DivBlock />
                                <Col xs={12} sm={12} md={9} lg={10}>
                                  <Grid fluid={true}>
                                    <Row>
                                      <Col xs={12} sm={12} md={12} lg={12} />
                                    </Row>
                                  </Grid>
                                  <Grid fluid={true}>
                                    <Row>
                                      <Col xs={12} sm={12} md={12} lg={12} />
                                    </Row>
                                  </Grid>
                                </Col>
                              </Row>
                            </Grid>
                          </DivBlock>
                        </TabPanel>
                        <TabPanel className="pt-3">
                          <DivBlock>
                            <Grid fluid={true}>
                              <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                  <Tabs>
                                    <TabList
                                      style={{ margin: "0px", padding: "0px" }}
                                    >
                                      <Tab className="btn btn-primary btn-sm mr-1">
                                        <Span>Basic</Span>
                                      </Tab>
                                      <Tab className="btn btn-primary btn-sm">
                                        <Span>Advanced</Span>
                                      </Tab>
                                    </TabList>
                                    <TabPanel className="pt-3">
                                      <DivBlock>
                                        <Row>
                                          <Col xs={12} sm={12} md={5} lg={5}>
                                            <DivBlock className="mb-3">
                                              <DivBlock className="d-flex align-items-center">
                                                <Button className="btn btn-primary">
                                                  <span>Buy</span>
                                                </Button>
                                                <Button className="btn btn-primary mr-1">
                                                  <span>Sell</span>
                                                </Button>
                                                <DivBlock className="flex-grow-1 mr-1">
                                                  <TextInput
                                                    isRequired={false}
                                                    placeholder="Amount"
                                                    className="form-control mr-1"
                                                  />
                                                </DivBlock>
                                                <DivBlock className="mr-1">
                                                  <SelectDropDown
                                                    isRequired={false}
                                                    options={[]}
                                                    className="form-control"
                                                  >
                                                    <SelectOption
                                                      value={1}
                                                      label="Select Option 1"
                                                    />
                                                  </SelectDropDown>
                                                </DivBlock>
                                              </DivBlock>
                                              <FormBlock />
                                            </DivBlock>
                                          </Col>
                                          <Col xs={12} sm={12} md={1} lg={1}>
                                            <DivBlock className="d-flex align-items-center justify-content-center mt-2">
                                              <Span>X</Span>
                                            </DivBlock>
                                          </Col>
                                          <Col xs={12} sm={12} md={6} lg={6}>
                                            <DivBlock className="d-flex">
                                              <DivBlock className="flex-grow-1">
                                                <TextInput
                                                  isRequired={false}
                                                  placeholder="Price"
                                                  className="form-control mr-1"
                                                />
                                              </DivBlock>
                                              <Button className="btn btn-primary ml-1 ">
                                                <span>Market</span>
                                              </Button>
                                              <Button className="btn btn-primary btn-sm mr-1">
                                                <span>Limit</span>
                                              </Button>
                                              <DivBlock>
                                                <TextInput
                                                  isRequired={false}
                                                  placeholder="Est Expense"
                                                  className="form-control"
                                                />
                                              </DivBlock>
                                            </DivBlock>
                                          </Col>
                                        </Row>
                                      </DivBlock>
                                    </TabPanel>
                                    <TabPanel>
                                      <DivBlock><Placeholder /></DivBlock>
                                    </TabPanel>
                                  </Tabs>
                                </Col>
                              </Row>
                            </Grid>
                          </DivBlock>
                        </TabPanel>
                        <TabPanel className="pt-3">
                          <DivBlock>
                            <Grid fluid={true}>
                              <Row
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  justifyContent: "center"
                                }}
                              >
                                <Col xs={12} sm={12} md={9} lg={10}>
                                  <Grid fluid={true}>
                                    <DivBlock className="card mb-3">
                                      <DivBlock className="card-header">
                                        <Heading
                                          type="h3"
                                          style={{
                                            textAlign: "center",
                                            textDecoration: "underline"
                                          }}
                                        >
                                          New and Open Orders
                                        </Heading>
                                      </DivBlock>
                                      <DivBlock className="card-body">
                                        <table className="table table-bordered">
                                          <thead>
                                            <tr>
                                              <th><span>Text in th</span></th>
                                              <th><span>Text in th</span></th>
                                              <th><span>Text in th</span></th>
                                              <th><span>Text in th</span></th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                            </tr>
                                            <tr>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </DivBlock>
                                    </DivBlock>
                                    <Row>
                                      <Col xs={12} sm={12} md={12} lg={12} />
                                    </Row>
                                  </Grid>
                                  <Grid fluid={true}>
                                    <Row>
                                      <Col xs={12} sm={12} md={12} lg={12}>
                                        <DivBlock className="card">
                                          <DivBlock className="card-header">
                                            <Heading
                                              type="h3"
                                              style={{
                                                textAlign: "center",
                                                textDecoration: "underline"
                                              }}
                                            >
                                              Closed Orders
                                            </Heading>
                                          </DivBlock>
                                          <DivBlock className="card-body">
                                            <table className="table table-bordered">
                                              <thead>
                                                <tr>
                                                  <th>
                                                    <span>Text in th</span>
                                                  </th>
                                                  <th>
                                                    <span>Text in th</span>
                                                  </th>
                                                  <th>
                                                    <span>Text in th</span>
                                                  </th>
                                                  <th>
                                                    <span>Text in th</span>
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </DivBlock>
                                        </DivBlock>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col xs={12} sm={12} md={12} lg={12} />
                                    </Row>
                                  </Grid>
                                </Col>
                              </Row>
                            </Grid>
                          </DivBlock>
                        </TabPanel>
                        <TabPanel className="pt-3">
                          <DivBlock>
                            <Grid fluid={true}>
                              <Row
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  justifyContent: "center"
                                }}
                              >
                                <Col xs={12} sm={12} md={9} lg={10}>
                                  <Grid fluid={true}>
                                    <DivBlock className="card mb-3">
                                      <DivBlock className="card-header">
                                        <Heading
                                          type="h3"
                                          style={{
                                            textAlign: "center",
                                            textDecoration: "underline"
                                          }}
                                        >
                                          Open Positions
                                        </Heading>
                                      </DivBlock>
                                      <DivBlock className="card-body">
                                        <table className="table table-bordered">
                                          <thead>
                                            <tr>
                                              <th><span>Text in th</span></th>
                                              <th><span>Text in th</span></th>
                                              <th><span>Text in th</span></th>
                                              <th><span>Text in th</span></th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                            </tr>
                                            <tr>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </DivBlock>
                                    </DivBlock>
                                    <Row>
                                      <Col xs={12} sm={12} md={12} lg={12} />
                                    </Row>
                                  </Grid>
                                  <Grid fluid={true}>
                                    <Row>
                                      <Col xs={12} sm={12} md={12} lg={12}>
                                        <DivBlock className="card">
                                          <DivBlock className="card-header">
                                            <Heading
                                              type="h3"
                                              style={{
                                                textAlign: "center",
                                                textDecoration: "underline"
                                              }}
                                            >
                                              Closed Positions
                                            </Heading>
                                          </DivBlock>
                                          <DivBlock className="card-body">
                                            <table className="table table-bordered">
                                              <thead>
                                                <tr>
                                                  <th>
                                                    <span>Text in th</span>
                                                  </th>
                                                  <th>
                                                    <span>Text in th</span>
                                                  </th>
                                                  <th>
                                                    <span>Text in th</span>
                                                  </th>
                                                  <th>
                                                    <span>Text in th</span>
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                  <td>
                                                    <span>Text in td</span>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </DivBlock>
                                        </DivBlock>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col xs={12} sm={12} md={12} lg={12} />
                                    </Row>
                                  </Grid>
                                </Col>
                              </Row>
                            </Grid>
                          </DivBlock>
                        </TabPanel>
                        <TabPanel className="pt-3">
                          <DivBlock>
                            <Grid fluid={true}>
                              <Row>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                  <DivBlock className="card mb-3">
                                    <DivBlock className="card-body">
                                      <Heading type="h1">
                                        Become a champion
                                      </Heading>
                                    </DivBlock>
                                  </DivBlock>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                  <DivBlock className="card mb-3">
                                    <DivBlock className="card-body">
                                      <Heading type="h1">Promo pic</Heading>
                                    </DivBlock>
                                  </DivBlock>
                                </Col>
                              </Row>
                              <Row><Col xs={12} sm={12} md={12} lg={12} /></Row>
                            </Grid>
                            <Grid fluid={true}>
                              <Row>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                  <DivBlock className="card mb-3">
                                    <DivBlock className="card-body">
                                      <table className="table table-bordered">
                                        <thead>
                                          <tr>
                                            <th>
                                              <span>Champion Category</span>
                                            </th>
                                            <th><span>Text in th</span></th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td><span>Text in td</span></td>
                                            <td><span>Text in td</span></td>
                                          </tr>
                                          <tr>
                                            <td><span>Text in td</span></td>
                                            <td><span>Text in td</span></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </DivBlock>
                                  </DivBlock>
                                  <DivBlock className="card">
                                    <DivBlock className="card-body">
                                      <table className="table table-bordered">
                                        <thead>
                                          <tr>
                                            <th>
                                              <span>Champion Category</span>
                                            </th>
                                            <th><span>Text in th</span></th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td><span>Text in td</span></td>
                                            <td><span>Text in td</span></td>
                                          </tr>
                                          <tr>
                                            <td><span>Text in td</span></td>
                                            <td><span>Text in td</span></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </DivBlock>
                                  </DivBlock>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                  <DivBlock className="card">
                                    <DivBlock className="card-body">
                                      <table className="table table-bordered">
                                        <thead>
                                          <tr>
                                            <th>
                                              <span>Champion Category</span>
                                            </th>
                                            <th><span>Text in th</span></th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td><span>Text in td</span></td>
                                            <td><span>Text in td</span></td>
                                          </tr>
                                          <tr>
                                            <td><span>Text in td</span></td>
                                            <td><span>Text in td</span></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </DivBlock>
                                  </DivBlock>
                                </Col>
                              </Row>
                              <Row><Col xs={12} sm={12} md={12} lg={12} /></Row>
                            </Grid>
                          </DivBlock>
                        </TabPanel>
                        <TabPanel className="pt-3">
                          <DivBlock>
                            <Grid fluid={true}>
                              <Row
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  justifyContent: "center"
                                }}
                              >
                                <Col xs={12} sm={12} md={9} lg={10}>
                                  <Grid fluid={true}>
                                    <DivBlock className="card">
                                      <DivBlock className="card-header">
                                        <Heading
                                          type="h3"
                                          style={{
                                            textAlign: "center",
                                            textDecoration: "underline"
                                          }}
                                        >
                                          History
                                        </Heading>
                                      </DivBlock>
                                      <DivBlock className="card-body">
                                        <table className="table table-bordered">
                                          <thead>
                                            <tr>
                                              <th><span>Text in th</span></th>
                                              <th><span>Text in th</span></th>
                                              <th><span>Text in th</span></th>
                                              <th><span>Text in th</span></th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                            </tr>
                                            <tr>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                              <td><span>Text in td</span></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </DivBlock>
                                    </DivBlock>
                                    <Row>
                                      <Col xs={12} sm={12} md={12} lg={12} />
                                    </Row>
                                    <Row>
                                      <Col xs={12} sm={12} md={12} lg={12} />
                                    </Row>
                                  </Grid>
                                </Col>
                              </Row>
                            </Grid>
                          </DivBlock>
                        </TabPanel>
                        <TabPanel>
                          <DivBlock>
                            <DivBlock><Span>Tab Contents 3</Span></DivBlock>
                          </DivBlock>
                        </TabPanel>
                        <TabPanel>
                          <DivBlock>
                            <DivBlock><Span>Tab Contents 3</Span></DivBlock>
                          </DivBlock>
                        </TabPanel>
                        <DivBlock />
                        <DivBlock />
                        <TabPanel />
                      </Tabs>
                    </DivBlock>
                  </TabPanel>
                  <TabPanel />
                  <TabPanel className="pt-3">
                    <DivBlock>
                      <Row
                        center="xs"
                        top="xs"
                        style={{ marginBottom: "10px" }}
                      >
                        <Col
                          xs={12}
                          sm={12}
                          md={3}
                          lg={3}
                          style={{ display: "flex" }}
                        >
                          <Heading type="h6">Title</Heading>
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={8}
                          lg={8}
                          style={{ width: "100%", display: "flex" }}
                        >
                          <TextInput
                            isRequired={false}
                            style={{ width: "100%" }}
                          />
                        </Col>
                      </Row>
                      <Row
                        center="xs"
                        top="xs"
                        style={{ marginBottom: "10px" }}
                      >
                        <Col
                          xs={12}
                          sm={12}
                          md={3}
                          lg={3}
                          style={{ display: "flex" }}
                        >
                          <Heading type="h6">Short description</Heading>
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={8}
                          lg={8}
                          style={{ display: "flex" }}
                        >
                          <TextInput
                            isRequired={false}
                            style={{ width: "100%" }}
                          />
                        </Col>
                      </Row>
                      <Row
                        center="xs"
                        top="xs"
                        style={{ marginBottom: "10px" }}
                      >
                        <Col
                          xs={12}
                          sm={12}
                          md={3}
                          lg={3}
                          style={{ display: "flex" }}
                        >
                          <Heading type="h6">Type</Heading>
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={8}
                          lg={8}
                          style={{ display: "flex" }}
                        >
                          <TextInput
                            isRequired={false}
                            style={{ width: "100%" }}
                          />
                        </Col>
                      </Row>
                      <Row
                        center="xs"
                        top="xs"
                        style={{ marginBottom: "10px" }}
                      >
                        <Col
                          xs={12}
                          sm={12}
                          md={3}
                          lg={3}
                          style={{ display: "flex" }}
                        >
                          <Heading type="h6">Category</Heading>
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={8}
                          lg={8}
                          style={{ display: "flex" }}
                        >
                          <TextInput
                            isRequired={false}
                            style={{ width: "100%" }}
                          />
                        </Col>
                      </Row>
                      <Row
                        center="xs"
                        top="xs"
                        style={{ marginBottom: "10px" }}
                      >
                        <Col
                          xs={12}
                          sm={12}
                          md={3}
                          lg={3}
                          style={{ display: "flex" }}
                        >
                          <Heading type="h6">Long description</Heading>
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={8}
                          lg={8}
                          style={{ display: "flex" }}
                        >
                          <TextInput
                            isRequired={false}
                            style={{ width: "100%" }}
                          />
                        </Col>
                      </Row>
                      <Row
                        center="xs"
                        top="xs"
                        style={{ marginBottom: "10px" }}
                      >
                        <Col
                          xs={12}
                          sm={12}
                          md={3}
                          lg={3}
                          style={{ display: "flex" }}
                        >
                          <Heading type="h6">Image</Heading>
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={8}
                          lg={8}
                          style={{ display: "flex" }}
                        >
                          <TextInput
                            isRequired={false}
                            style={{ width: "100%" }}
                          />
                        </Col>
                      </Row>
                      <Row center="xs" top="xs">
                        <Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          style={{
                            order: "1",
                            flex: "1 0 auto",
                            display: "flex",
                            flexDirection: "row-reverse",
                            marginBottom: "20px",
                            marginRight: "60px"
                          }}
                        >
                          <Button><span>Button</span></Button>
                        </Col>
                      </Row>
                    </DivBlock>
                  </TabPanel>
                  <TabPanel className="pt-3">
                    <DivBlock>
                      <Grid fluid={true}>
                        <Row center="xs" top="xs">
                          <Col xs={12} sm={12} md={12} lg={12}>
                            <Heading type="h4" style={{ textAlign: "left" }}>
                              Open Events
                            </Heading>
                          </Col>
                        </Row>
                        <Row center="xs" top="xs">
                          <Col xs={12} sm={12} md={4} lg={4}>
                            <Placeholder />
                          </Col>
                          <Col xs={12} sm={12} md={4} lg={4}>
                            <Placeholder />
                          </Col>
                          <Col xs={12} sm={12} md={4} lg={4}>
                            <Placeholder />
                          </Col>
                        </Row>
                        <Row><Col xs={12} sm={12} md={12} lg={12} /></Row>
                        <Row center="xs" top="xs">
                          <Col xs={12} sm={12} md={12} lg={12}>
                            <Heading type="h4" style={{ textAlign: "left" }}>
                              Upcoming Events
                            </Heading>
                          </Col>
                        </Row>
                        <Row center="xs" top="xs">
                          <Col xs={12} sm={12} md={4} lg={4}>
                            <Placeholder />
                          </Col>
                          <Col xs={12} sm={12} md={4} lg={4}>
                            <Placeholder />
                          </Col>
                          <Col xs={12} sm={12} md={4} lg={4}>
                            <Placeholder />
                          </Col>
                        </Row>
                      </Grid>
                    </DivBlock>
                  </TabPanel>
                  <TabPanel>
                    <DivBlock>
                      <DivBlock>
                        <DivBlock>
                          <List>
                            <ListItem><p>Test update two</p></ListItem>
                            <ListItem><p>Test update</p></ListItem>
                            <ListItem><p>List Item</p></ListItem>
                          </List>
                        </DivBlock>
                        <Span>Tab Contents 3</Span>
                      </DivBlock>
                    </DivBlock>
                  </TabPanel>
                  <TabPanel>
                    <DivBlock>
                      <DivBlock><Span>Tab Contents 3</Span></DivBlock>
                    </DivBlock>
                  </TabPanel>
                  <TabPanel className="pt-3">
                    <DivBlock>
                      <Grid fluid={true}>
                        <DivBlock className="card mb-3">
                          <DivBlock className="card-body">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th><span>Forum</span></th>
                                  <th><span>Topics</span></th>
                                  <th><span>Posts</span></th>
                                  <th><span>Last Post</span></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><span>Text in td</span></td>
                                  <td><span>Text in td</span></td>
                                  <td><span>Text in td</span></td>
                                  <td><span>Text in td</span></td>
                                </tr>
                                <tr>
                                  <td><span>Text in td</span></td>
                                  <td><span>Text in td</span></td>
                                  <td><span>Text in td</span></td>
                                  <td><span>Text in td</span></td>
                                </tr>
                              </tbody>
                            </table>
                          </DivBlock>
                        </DivBlock>
                        <Row><Col xs={12} sm={12} md={12} lg={12} /></Row>
                      </Grid>
                    </DivBlock>
                  </TabPanel>
                  <DivBlock><DivBlock><DivBlock /></DivBlock></DivBlock>
                  <TabPanel />
                </Tabs>
              </DivBlock>
            </Then>
            <Else>
              <If condition="{{show_sign_up}} === true">
                <Then>
                  <Grid fluid={true}>
                    <Row style={{ display: "flex", justifyContent: "center" }}>
                      <Col xs={12} sm={12} md={6} lg={4}>
                        <DivBlock>
                          <FormBlock
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              paddingLeft: "1rem",
                              paddingRight: "1rem",
                              marginTop: "0.5rem",
                              marginBottom: "0.5rem"
                            }}
                            className="card"
                          >
                            <Row center="xs" top="xs">
                              <Col xs={12} sm={12} md={2} lg={2}>
                                <img
                                  src={time_acadamy_logo}
                                  style={{ width: "50px" }}
                                />
                              </Col>
                              <Col xs={12} sm={12} md={8} lg={8}>
                                <Heading type="h3">
                                  Welcome to time academy
                                </Heading>
                              </Col>
                            </Row>
                            <div className="form-group">
                              <TextInput
                                isRequired={true}
                                name="username"
                                placeholder="User Name"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group">
                              <TextInput
                                isRequired={true}
                                placeholder="Email"
                                className="form-control"
                                name="email"
                              />
                            </div>
                            <div className="form-group">
                              <TextInput
                                isRequired={true}
                                name="password"
                                placeholder="Password"
                                className="form-control"
                                type="password"
                              >
                                <DivBlock><Placeholder /></DivBlock>
                              </TextInput>
                            </div>
                            <div className="form-group" />
                            <div
                              className="form-group small"
                              style={{ textAlign: "center" }}
                            >
                              <Span>
                                By clicking create account, you agree to CryptoArena's conditions of use and privacy notice
                              </Span>
                            </div>
                            <div
                              className="form-group"
                              style={{ textAlign: "center" }}
                            >
                              <Button
                                className="btn btn-primary btn-block"
                                style={{
                                  width: "100%",
                                  backgroundColor: "#70ad47",
                                  borderColor: "#000000",
                                  borderTopColor: "#000000",
                                  borderLeftColor: "#000000",
                                  borderRightColor: "#000000",
                                  borderBottomColor: "#000000",
                                  borderTopStyle: "none",
                                  borderLeftStyle: "none",
                                  borderRightStyle: "none",
                                  borderBottomStyle: "none"
                                }}
                                actions={[
                                  { action: "show_app", trigger: "onclick" }
                                ]}
                              >
                                Sign Up
                              </Button>
                              <Button
                                className="btn btn-primary btn-block"
                                style={{
                                  width: "100%",
                                  backgroundColor: "#70ad47",
                                  borderColor: "#000000",
                                  borderTopColor: "#000000",
                                  borderLeftColor: "#000000",
                                  borderRightColor: "#000000",
                                  borderBottomColor: "#000000",
                                  borderTopStyle: "none",
                                  borderLeftStyle: "none",
                                  borderRightStyle: "none",
                                  borderBottomStyle: "none"
                                }}
                                actions={[
                                  { action: "hide_sign_up", trigger: "onclick" }
                                ]}
                              >
                                Already have an account?
                              </Button>
                            </div>
                          </FormBlock>
                        </DivBlock>
                      </Col>
                    </Row>
                  </Grid>
                </Then>
                <Else>
                  <Grid fluid={true} actions={[]}>
                    <Row style={{ display: "flex", justifyContent: "center" }}>
                      <Col xs={12} sm={12} md={6} lg={4}>
                        <DivBlock>
                          <FormBlock
                            style={{
                              paddingTop: "1rem",
                              paddingBottom: "1rem",
                              paddingLeft: "1rem",
                              paddingRight: "1rem",
                              marginTop: "15%",
                              backgroundColor: "#ffffff"
                            }}
                            className="card"
                          >
                            <Row center="xs" top="xs">
                              <Col xs={12} sm={12} md={2} lg={2}>
                                <img
                                  src={time_acadamy_logo}
                                  style={{ width: "50px" }}
                                />
                              </Col>
                              <Col xs={12} sm={12} md={8} lg={8}>
                                <Heading type="h3">
                                  Welcome to time academy
                                </Heading>
                              </Col>
                            </Row>
                            <div className="form-group">
                              <TextInput
                                isRequired={false}
                                name="username"
                                placeholder="Username"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group">
                              <TextInput
                                isRequired={false}
                                name="password"
                                placeholder="Password"
                                className="form-control"
                                type="password"
                              >
                                <DivBlock><Placeholder /></DivBlock>
                              </TextInput>
                            </div>
                            <div className="form-group" />
                            <div
                              className="form-group"
                              style={{ textAlign: "center" }}
                            >
                              <Button
                                className="btn btn-primary btn-block"
                                style={{
                                  width: "100%",
                                  backgroundColor: "#70ad47"
                                }}
                                actions={[
                                  { action: "show_app", trigger: "onclick" }
                                ]}
                              >
                                Login
                              </Button>
                              <Button
                                className="btn btn-primary btn-block"
                                style={{
                                  width: "100%",
                                  backgroundColor: "#70ad47"
                                }}
                                actions={[
                                  { action: "show_sign_up", trigger: "onclick" }
                                ]}
                              >
                                Create Account
                              </Button>
                            </div>
                            <Paragraph>Forgot your password?</Paragraph>
                          </FormBlock>
                        </DivBlock>
                      </Col>
                    </Row>
                  </Grid>
                </Else>
              </If>
            </Else>
          </If>
        </DivBlock>

      </div>
    ); // eslint-disable-line
  }
}

export default HomePage;
