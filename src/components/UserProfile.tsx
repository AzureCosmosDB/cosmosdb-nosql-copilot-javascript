interface IUserProfileProps {
    userData: {
        authorityType: string;
        name: string;
        username: string;
    };
}

const UserProfile: React.FC<IUserProfileProps> = ({ userData }) => {
    const closeModal = () => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        modal.close();
    };

    return (
        <dialog id="my_modal_1" className="modal min-w-fit">
            <div className="modal-box flex flex-col gap-3">
                <h3 className="font-bold text-lg">Profile Information</h3>
                <p>
                    <strong>Auth Type:</strong> {userData.authorityType}
                </p>
                <p >
                    <strong>Name:</strong> {userData.name}
                </p>
                <p >
                    <strong>Email:</strong> {userData.username}
                </p>
                <div className="modal-action">
                    <button className="btn btn-info btn-sm" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default UserProfile;
