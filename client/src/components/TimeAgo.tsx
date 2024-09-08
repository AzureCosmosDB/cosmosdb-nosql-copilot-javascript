import ReactTimeAgo from 'react-time-ago'; // Import the ReactTimeAgo component for rendering time differences

// Define the props for the TimeAgo component
interface TimeAgoProps {
    date: Date; // The date to calculate the time ago from
}

// Functional component to display the time ago from a specific date
export default function TimeAgo({ date }: TimeAgoProps) {
    return (
        <span>
            {/* Display the text "Last seen" followed by the relative time (e.g., "2 minutes ago") */}
            Last seen: <ReactTimeAgo date={date} locale="en" timeStyle="twitter" />
        </span>
    );
}
