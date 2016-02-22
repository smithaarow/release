// fetch data
domo.get('/data/v1/release_planning')
    .then(function(release_planning){
      console.log("release_planning", release_planning);
    
        // Initialize Datatable
        var table = $('#example').DataTable( {
            scrollY:        '75vh',
            scrollCollapse: true,
            paging:         false,
            order: [[ 0, 'asc',1 ]],
            drawCallback: function ( settings ) {
                var api = this.api();
                var rows = api.rows( {page:'current'} ).nodes();
                var last=null;
                api.column(0, {page:'current'} ).data().each( function ( Shipment, i ) {
                    if ( last !== Shipment) {
                        $(rows).eq( i ).before(
                            '<tr class="Shipment_group"><td colspan="42">'+Shipment+'</td></tr>'
                        );

                        last = Shipment;
                    }
                } );
            },
            data: release_planning,
            columns: [
                {
                     data: "Shipment",
                    class: "Shipment",
                    title: "Shipment",
                    visible: false
                },
                {
                    data: "Ship Date",
                    class: "Ship Date",
                    title: "Ship Date",
                    sortable: true,
                },
                {
                    data: "Jira Number",
                    class: "Jira Number",
                    title: "Jira Number",
                    "render": function ( data, type, full, meta ) {
                        return '<a href="https://onjira.domo.com/browse/'+data+'" target="_blank">'+data+'</a>';
                    },
                },
                
                {
                    data: "Epic Name",
                    class: "Epic Name",
                    title: "Epic Name"
                },
                {
                    data: "summary",
                    class: "summary",
                    title: "Summary",
                    "render": function ( data, type, full, meta ) {
                        return '<div class="container-overflowing">'+data+'</div>';
                    },
                },
                {
                    data: "Dev Manager",
                    class: "Dev Manager",
                    title: "Dev Manager"
                    },
          
                {
                    data: "squad",
                    class: "squad",
                    title: "Squad",
                    "render": function ( data, type, full, meta ) {
                        return '<div class="container-overflowing">'+data+'</div>';
                    },
                },
                {
                    data: "Status",
                    class: "Status",
                    title: "Status"
                    },
                
                
            ]
        });



        // Toggle visibility of columns
        $('a.toggle-vis').on( 'click', function (e) {
            e.preventDefault();

            for ( var i=8 ; i<18 ; i++ ) {
                //table.column( i ).visible( false, false );
                table.column( i ).visible( ! table.column( i ).visible() );
            }
            // adjust column sizing and redraw
            table.columns.adjust().draw( false );

        } );

        // Reset Sorting
        $('a.reset-sort').on( 'click', function (e) {
            e.preventDefault();

            table.order([ 0, 'asc' ]).draw();

        } );
        $('.sorting_desc').on( 'click', function (e) {
            e.preventDefault();
            console.log('th.sorting-desc clicked');

            table.order([ 0, 'asc' ]).draw();

        } );



} );