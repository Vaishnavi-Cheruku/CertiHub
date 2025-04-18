function GeneralFormWrapper() {
    const { id } = useParams();
    console.log(id); // This will log the value of the ID in the URL
    const excludedIds = ['8', '19', '26', '37', '45'];
  
    if (excludedIds.includes(id)) {
      return <div className="text-center mt-20 text-xl text-red-600">Invalid Access</div>;
    }
  
    return <GeneralForm />;
  }
  