import { Accordion as MaterialAccordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import P from 'prop-types'

export const Accordion = ({ title, children }) => {
    return (
        <MaterialAccordion style={{ width: '800px' }}>
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
        </MaterialAccordion>
    )
}

Accordion.propTypes = {
    title: P.string.isRequired,
    children: P.node.isRequired
}