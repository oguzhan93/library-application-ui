"use client"
import React, { useEffect, useState } from 'react';
import { Button, TextBox, } from "devextreme-react"
import Box, { Item } from 'devextreme-react/box.js';

import DataGrid, {
    Editing,
    HeaderFilter,
    FilterPanel,
    FilterRow,
    Pager,
    Paging,
} from 'devextreme-react/data-grid';

import { getMembers, updateMember, deleteMember, createMember } from './data.js';

let columns = ["name", "address"]

const allowedPageSizes = [5];

function Member() {
    {

        const [memberName, setMemberName] = useState("")
        const [tckNo, setTckNo] = useState("")
        const [address, setAddress] = useState("")

        const handleAddNewMemberButtonClick = () => {
            const newMember = { name: memberName, address: address, tckNo: tckNo }
            createMember(newMember).then(response => {
                console.log(response.data)

                if (response.data.success === true) {
                    getMembers().then(response => {
                        setMembers(response.data.data)
                    }).catch(err => {
                        console.log(err.message)
                    })
                } else {
                    console.log("Something Went Wrong!")
                }
            })

        }

        const implementCrudOperations = (operation) => {
            let id
            if (operation[0] != null && operation[0] != undefined) {
                id = operation[0].key
            }

            if (operation[0] && operation[0].type === "remove") {
                deleteMember(id).then(response => {
                    console.log(response.data)
                })
            }

            if (operation[0] && operation[0].type === "update") {
                updateMember(id, operation[0].data).then(response => {
                    console.log(response.data)
                })
            }
        }

        const [members, setMembers] = useState([])

        useEffect(() => {
            getMembers().then(response => {
                setMembers(response.data.data)
            }).catch(err => {
                console.log(err.message)
            })
        }, [])

        return (
            <>
                <Box style={{background: "#e7eaf6", borderRadius: "10px"}} direction='row'>

                    <Item ratio={2}>
                        <h2 style={{padding: "15px"}}>Member Table</h2>
                        <DataGrid
                            dataSource={members}
                            defaultColumns={columns}
                            keyExpr="id"
                            focusedRowEnabled={true}
                            showBorders={true}

                        >
                            <Editing
                                onChangesChange={implementCrudOperations}
                                allowUpdating={true}
                                allowDeleting={true}
                                selectTextOnEditStart={true}
                                useIcons={true}
                            />
                            <HeaderFilter visible={true} />
                            <FilterPanel visible={true} />
                            <FilterRow visible={true} />
                            <Pager
                                allowedPageSizes={allowedPageSizes}
                                showPageSizeSelector={true}
                                showNavigationButtons={true}
                            />
                            <Paging defaultPageSize={5} />
                        </DataGrid>
                    </Item>

                </Box>

                <Box style={{background: "#ececec", marginTop: "15px", borderRadius: "10px"}} align='center'>
                    <Item ratio={1}>
                        <div spacing={3} style={{padding: "15px", background: "#e7eaf6", width: "100%", borderRadius: "10px", justifyContent: "center", alignItems: "center" }}>
                            <div lg={3} md={2} xs={1} >
                                <h2>Add New Member</h2>
                            </div>
                            <div style={{marginTop: "15px"}} lg={2} md={2} xs={1}><TextBox onValueChanged={(e) => { setMemberName(e.value) }} showClearButton={true} label="Name"></TextBox></div>
                            <div style={{marginTop: "15px"}} lg={2} md={2} xs={1}><TextBox onValueChanged={(e) => { setAddress(e.value) }} showClearButton={true} label="Address"></TextBox></div>
                            <div style={{marginTop: "15px"}} lg={2} md={2} xs={1}><TextBox onValueChanged={(e) => { setTckNo(e.value) }} showClearButton={true} label="Tc No"></TextBox></div>
                            <div style={{marginTop: "15px"}} lg={2} md={2} xs={1}><Button onClick={handleAddNewMemberButtonClick} text="Add New Member" style={{ background: "green", color: "white" }}>
                            </Button></div>
                        </div>
                    </Item>

                </Box>

            </>
        );
    }
}

export default Member;
