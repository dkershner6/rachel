import React, { ReactElement } from "react";

import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import Layout from "@theme/Layout";
import { useForm } from "react-hook-form";
const GenomeSequenceDeletionFinder = (): ReactElement => {
    const [results, setResults] = React.useState(new Array<string>());
    const { handleSubmit, register } = useForm<{
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

    // eslint-disable-next-line sonarjs/cognitive-complexity
    const onSubmit = handleSubmit(async (data) => {
        const { numberOfDeletions, minimumSurrounderValue } = data;
        const genomeData = await data.file[0].text();

        const resultsAccumulator = new Array<string>();
        let startSurrounder = null;
        const zeroes = new Set<string>();

        const lines = genomeData.split("\n");

        for (const line of lines) {
            const columns = line.split("\t");

            const id = columns[data.idColumn - 1];
            const dataValue = Number(columns[data.dataColumn - 1]);

            if (dataValue !== 0 && dataValue >= minimumSurrounderValue) {
                if (zeroes.size >= numberOfDeletions) {
                    resultsAccumulator.push(id);
                    startSurrounder = id;
                    zeroes.clear();
                    console.log("START", resultsAccumulator);
                    continue;
                }

                startSurrounder = id;
                continue;
            }

            if (dataValue !== 0 && dataValue < minimumSurrounderValue) {
                if (zeroes.size >= numberOfDeletions)
                    console.log("CLEAR DUE TO LOW SURROUNDER", dataValue);
                startSurrounder = null;
                zeroes.clear();

                continue;
            }

            if (dataValue === 0 && startSurrounder) {
                zeroes.add(id);
                if (zeroes.size >= numberOfDeletions)
                    console.log("ZERO", zeroes.size);
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
                                <label htmlFor="file-input">
                                    Data to Process
                                </label>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    File must be tab delimited
                                </Typography>
                            </Box>
                            <Box>
                                <input
                                    id="file-input"
                                    type="file"
                                    {...register("file")}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} marginTop={3}>
                        <Button size="large" type="submit" variant="contained">
                            Process
                        </Button>
                    </Grid>
                </form>
                <Box marginY={5}>
                    <Typography component="h2" variant="h4" gutterBottom>
                        Results
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {results.length} results found
                    </Typography>
                    <p>{results.join(", ")}</p>
                </Box>
            </Container>
        </Layout>
    );
};

export default GenomeSequenceDeletionFinder;
