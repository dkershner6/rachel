import React, { ReactElement } from "react";

import CheckIcon from "@mui/icons-material/Check";
import UploadIcon from "@mui/icons-material/UploadFile";
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Layout from "@theme/Layout";
import { useForm } from "react-hook-form";

interface DeletionResult {
    startingId: string;
    endingId: string;
    lengthOfDeletion: number;
}

const GenomeSequenceDeletionFinder = (): ReactElement => {
    const [results, setResults] = React.useState(new Array<DeletionResult>());

    const { handleSubmit, register, watch } = useForm<{
        idColumn: number;
        dataColumn: number;
        numberOfDeletions: number;
        minimumSurrounderValue: number;
        file: File;
    }>({
        defaultValues: {
            idColumn: 2,
            dataColumn: 3,
            numberOfDeletions: 15,
            minimumSurrounderValue: 4,
        },
    });

    const file = watch("file");

    // eslint-disable-next-line sonarjs/cognitive-complexity
    const onSubmit = handleSubmit(async (data) => {
        const { numberOfDeletions, minimumSurrounderValue } = data;
        const genomeData = await data.file[0].text();

        const resultsAccumulator = new Array<DeletionResult>();
        let startSurrounder = null;
        const zeroes = new Set<string>();

        const lines = genomeData.split("\n");

        for (const line of lines) {
            const columns = line.split("\t");

            const id = columns[data.idColumn - 1];
            const dataValue = Number(columns[data.dataColumn - 1]);

            if (dataValue !== 0 && dataValue >= minimumSurrounderValue) {
                if (zeroes.size >= numberOfDeletions) {
                    resultsAccumulator.push({
                        startingId: startSurrounder,
                        endingId: id,
                        lengthOfDeletion: zeroes.size,
                    });
                    startSurrounder = id;
                    zeroes.clear();
                    continue;
                }

                startSurrounder = id;
                continue;
            }

            if (dataValue !== 0 && dataValue < minimumSurrounderValue) {
                startSurrounder = null;
                zeroes.clear();

                continue;
            }

            if (dataValue === 0 && startSurrounder) {
                zeroes.add(id);
            }
        }

        setResults(resultsAccumulator);
    });

    return (
        <Layout>
            <Container sx={{ marginBottom: 10 }}>
                <Typography component="h1" variant="h2" gutterBottom>
                    Genome Sequence Deletion Finder
                </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                required
                                label="Id Column"
                                type="number"
                                {...register("idColumn", {
                                    valueAsNumber: true,
                                })}
                                helperText="The column number from the left, starting at 1, that contains the ID of each row"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                required
                                label="Data Column"
                                type="number"
                                {...register("dataColumn", {
                                    valueAsNumber: true,
                                })}
                                helperText="The column number from the left, starting at 1, that contains the data to detect deletions within"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                label="Number of Deletions"
                                type="number"
                                {...register("numberOfDeletions", {
                                    valueAsNumber: true,
                                })}
                                helperText="The minimum number of deletions (Zeroes) to detect"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                label="Minimum Surrounder Value"
                                type="number"
                                {...register("minimumSurrounderValue", {
                                    valueAsNumber: true,
                                })}
                                helperText="The data surrounding the deletion must be greater than or equal to this value"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box marginRight={2}>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    htmlFor="file-input"
                                    startIcon={
                                        file ? <CheckIcon /> : <UploadIcon />
                                    }
                                >
                                    Upload Tab-Delimited Data
                                    <input
                                        id="file-input"
                                        type="file"
                                        hidden
                                        {...register("file")}
                                        accept=".csv,.txt,.tsv"
                                    />
                                </Button>
                            </Box>
                            <Box></Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} marginTop={3}>
                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            disabled={!file}
                        >
                            Process
                        </Button>
                    </Grid>
                </form>
                <Box marginY={5} height={400} width="100%">
                    <DataGrid
                        rows={results}
                        columns={[
                            {
                                field: "startingId",
                                headerName: "Starting Id",
                                width: 200,
                            },
                            {
                                field: "endingId",
                                headerName: "Ending Id",
                                width: 200,
                            },
                            {
                                field: "lengthOfDeletion",
                                headerName: "Length of Deletion",
                                width: 200,
                            },
                        ]}
                        getRowId={(row) => row.startingId}
                        rowsPerPageOptions={[100]}
                        components={{ Toolbar: GridToolbar }}
                    />
                </Box>
            </Container>
        </Layout>
    );
};

export default GenomeSequenceDeletionFinder;
