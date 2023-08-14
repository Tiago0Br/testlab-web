import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import P from 'prop-types'

export default function customAccordion({ title, children }) {
    return (
        <Accordion>
            <AccordionSummary
                aria-controls='panel1a-content'
                id={`accordion-${title}-header`}
                expandIcon={ <ExpandMore /> }
            >
                <Typography>{ title }</Typography>
            </AccordionSummary>
            <AccordionDetails>
                { children }
            </AccordionDetails>
        </Accordion>
    )
}

customAccordion.propTypes = {
    title: P.string.isRequired,
    children: P.node.isRequired
}