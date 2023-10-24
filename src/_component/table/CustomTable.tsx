import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./TableComponents.css";
import CustomSpinner from "../display/CustomSpinner";

interface Props {
	data: any[];
	loading?: boolean;
	HeaderRow?: () => JSX.Element;
	ContentRow: (row: any) => JSX.Element;
}

const rowsPerPage = 40;

export default function CustomTable(props: Props) {
	const {
		data,
		loading = false,
		HeaderRow,
		ContentRow
	} = props;
	const [page, setPage] = useState(0);

	useEffect(() => {
		if (data.length <= rowsPerPage) {
			setPage(0);
		}
	}, [data.length]);
	function handleChangePage(event: any, newPage: number) {
		setPage(newPage);
	}

	return (
		<div className={"custom-table-container"}>
			<Table style={{ marginTop: "1.5rem" }}>
				{HeaderRow && (
					<TableHead>
						<HeaderRow />
					</TableHead>
				)}

				<TableBody className="custom-table-body">
					{loading ? (
						<TableRow>
							<TableCell className={"loading-icon-style"}>
								<CustomSpinner size={rowsPerPage}/>
							</TableCell>
						</TableRow>
					) : (
						<>
							{data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((object, index) => (
									<ContentRow key={index} row={object} />
								))}
						</>
					)}
				</TableBody>
				{!loading && data.length > 50 && (
					<TableFooter className="custom-table-footer">
						<TableRow className="custom-table-footer-row">
							<TablePagination
								labelDisplayedRows={({ from, to, count }) =>
									`${from}-${to} from ${count}`
								}
								className="custom-table-footer-pagination"
								count={data.length}
								page={page}
								rowsPerPageOptions={[]}
								rowsPerPage={rowsPerPage}
								onPageChange={handleChangePage}
								showFirstButton
								showLastButton
								sx={{
									"& .MuiTablePagination-toolbar": {
										padding: "0px !important",
										"& .MuiToolbar-gutters": {
											padding: "0px !important",
										},
									},
								}}
								align="right"
							/>
						</TableRow>
					</TableFooter>
				)}
			</Table>
		</div>
	);
};
