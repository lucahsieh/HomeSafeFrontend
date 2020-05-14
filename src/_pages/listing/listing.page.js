import React from 'react'

import { Divider, Header, Icon, Table, Grid, Image, Button } from 'semantic-ui-react'

import auth from '../../_services/auth'
import SearchBar from '../../_components/searchbar'
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
        geoResult: null,
        data: []
    }

    handleSearch = (searchValue, geoResult) => {
        this.setState({ searchValue: searchValue });
        console.log('searchValue', this.state.searchValue);

    };

    componentDidMount() {
        fetch(`https://10kftdb.azurewebsites.net/api/properties`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ data: result });
                },
                (error) => {
                    console.log('error', error)
                }
            )


    }

    render() {

        if (this.state.data.length < 1) return <div><LoadingSpinner /></div>

        return (
            <div>
                <PageHeader
                    icon={null}
                    text='Search' >
                </PageHeader>

                <Grid >
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <SearchBar onClickSearch={this.handleSearch} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={6}>
                            <PropertyList properties={this.state.data} />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Map properties={this.state.data} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            </div>
        );
    }
}

export default ListingPage;