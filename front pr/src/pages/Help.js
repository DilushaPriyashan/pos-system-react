import '../css/help.css';

const Help = () => {
    return (
        <div>
            <h1 class="h1 help">Do you need a help</h1>

            <div class="section">
                <h4>Welcome to the POS System Help Page</h4>
                <p>
                    In our Point of Sale (POS) system, the admin has various functionalities to manage customers, items, and orders.
                </p>
            </div>

            <div class="section">
                <h4>Customer Management</h4>
                <p>
                    Admin can <code>add</code>, <code>view</code>, and <code>update</code> customer information. This includes details such as name, contact information, and address.
                </p>
            </div>

            <div class="section">
                <h4>Item Management</h4>
                <p>
                    Admin can <code>add</code>, <code>view</code>, and <code>update</code> items. Items are categorized for easy organization, and details such as name, price, and quantity are tracked.
                </p>
            </div>

            <div class="section">
                <h4>Order Placement</h4>
                <p>
                    In the order page, the admin can select a customer from the list and choose items to add to the cart. The quantity of each item can be specified, and the cart can be updated accordingly.
                </p>
                <p>
                    Once the items are in the cart, the admin can <code>place an order</code>. The system calculates the total amount based on the selected items and their quantities.
                </p>
            </div>

            <div class="section last">
                <p>
                    Our POS system simplifies the management of customers, items, and orders, providing an efficient and user-friendly experience for admins.
                </p>
            </div>
        </div>

    )
}

export default Help;