import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PageHeader from 'components/generic/PageHeader';



export default () => {
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <>
            <PageHeader
                heading="Checklist"
                subheading="yassified"
            />
            <div style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleChange} />}
                    label="Check me"

                />
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleChange} />}
                    label="jee"
                />
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleChange} />}
                    label="jeess"
                />
            </div>
        </>
    );
}
