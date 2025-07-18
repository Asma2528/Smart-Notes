

function Alert(props) {
      if (!props.message) return null;

    setTimeout(() => {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);

    return (
        <div className="alert flex items-center justify-center mt-2">
            <div className="w-64 p-3 text-sm text-amber-500 rounded-lg bg-amber-50 dark:bg-neutral-700 dark:text-amber-400" role="alert">
                <span className="font-medium">{props.type}!</span> {props.message}
            </div>
        </div>
    )
}

export default Alert
