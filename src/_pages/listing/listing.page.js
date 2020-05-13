import React from 'react'

import { Divider, Header, Icon, Table, Grid, Image, Button } from 'semantic-ui-react'

import auth from '../../_services/auth'
import Search from '../../_components/search'
import * as Images from '../../_constants/images';
import Map from '../../_components/map/map';
import PageHeader from '../../_components/pageHeader'
import PropertyList from './propertyList'
import LoadingSpinner from '../../_components/loadingSpinner'

class ListingPage extends React.Component {
    state = {
        lat: null,
        long: null,
        errorMessage: null,
        searchValue: null,
        data: []
    }

    handleSearch = (searchValue) => {
        this.setState({ searchValue: searchValue });
    };

    async componentDidMount() {
         const result = await fetch(`https://10kftdb.azurewebsites.net/api/properties`);
         const json = await result.json();
         this.setState({ data: json });
    }

    render() {

        if (this.state.data.length < 1) return <div><LoadingSpinner/></div> 

        return (
            <div>
                <PageHeader
                    icon={null}
                    text='Search' >
                </PageHeader>
                <Search onClickSearch={this.handleSearch} />
                <PropertyList properties={this.state.data} />
                <Map properties={this.state.data} />
            </div>
        );
    }
}

export default ListingPage;